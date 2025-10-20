#!/usr/bin/env python3
"""Generate example plots for R for Biologists documentation"""

import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

# Set style
plt.rcParams['figure.facecolor'] = 'white'
plt.rcParams['axes.facecolor'] = 'white'
plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')

# Create output directory
output_dir = Path("public/images/r")
output_dir.mkdir(parents=True, exist_ok=True)

# Set random seed for reproducibility
np.random.seed(42)

# ============================================================================
# VISUALIZATION.MDX PLOTS
# ============================================================================

# 1. Histogram
fig, ax = plt.subplots(figsize=(8, 6))
data = np.random.normal(4200, 800, 342)
ax.hist(data, bins=30, color='steelblue', edgecolor='white', alpha=0.9)
ax.set_title('Distribution of Body Mass', fontsize=14, fontweight='bold')
ax.set_xlabel('Body Mass (g)', fontsize=12)
ax.set_ylabel('Count', fontsize=12)
ax.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig(output_dir / 'histogram.png', dpi=300, bbox_inches='tight')
plt.close()

# 2. Boxplot
fig, ax = plt.subplots(figsize=(8, 6))
species = ['Adelie', 'Chinstrap', 'Gentoo']
data = [
    np.random.normal(3700, 400, 100),
    np.random.normal(3700, 300, 100),
    np.random.normal(5000, 500, 100)
]
bp = ax.boxplot(data, labels=species, patch_artist=True)
colors = ['#FC8D62', '#8DA0CB', '#66C2A5']
for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.8)
ax.set_title('Body Mass by Species', fontsize=14, fontweight='bold')
ax.set_xlabel('Species', fontsize=12)
ax.set_ylabel('Body Mass (g)', fontsize=12)
ax.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.savefig(output_dir / 'boxplot.png', dpi=300, bbox_inches='tight')
plt.close()

# 3. Scatterplot
fig, ax = plt.subplots(figsize=(8, 6))
n_per_species = 100
colors_map = {'Adelie': '#E41A1C', 'Chinstrap': '#377EB8', 'Gentoo': '#4DAF4A'}
for species, color in colors_map.items():
    if species == 'Adelie':
        x = np.random.normal(190, 7, n_per_species)
        y = np.random.normal(3700, 400, n_per_species)
    elif species == 'Chinstrap':
        x = np.random.normal(195, 7, n_per_species)
        y = np.random.normal(3700, 300, n_per_species)
    else:  # Gentoo
        x = np.random.normal(217, 7, n_per_species)
        y = np.random.normal(5000, 500, n_per_species)
    ax.scatter(x, y, c=color, label=species, alpha=0.6, s=50)
ax.set_title('Flipper Length vs Body Mass', fontsize=14, fontweight='bold')
ax.set_xlabel('Flipper Length (mm)', fontsize=12)
ax.set_ylabel('Body Mass (g)', fontsize=12)
ax.legend(title='Species', frameon=True)
ax.grid(alpha=0.3)
plt.tight_layout()
plt.savefig(output_dir / 'scatterplot.png', dpi=300, bbox_inches='tight')
plt.close()

# 4. Growth curve line plot
fig, ax = plt.subplots(figsize=(8, 6))
time_hours = np.arange(0, 25)
od600 = [0.05, 0.06, 0.08, 0.12, 0.18, 0.28, 0.42, 0.58,
         0.72, 0.84, 0.92, 0.96, 0.98, 0.99, 1.00, 1.00,
         1.01, 1.01, 1.02, 1.02, 1.02, 1.03, 1.03, 1.03, 1.03]
ax.plot(time_hours, od600, 'o-', color='steelblue', linewidth=2, markersize=6)
ax.set_title('Bacterial Growth Curve', fontsize=14, fontweight='bold')
ax.set_xlabel('Time (hours)', fontsize=12)
ax.set_ylabel('OD600', fontsize=12)
ax.grid(alpha=0.3)
plt.tight_layout()
plt.savefig(output_dir / 'lineplot.png', dpi=300, bbox_inches='tight')
plt.close()

# ============================================================================
# RNASEQ-ANALYSIS.MDX PLOTS
# ============================================================================

# Generate mock RNA-seq data
n_genes = 100
# Most genes have no change
log2_fc = np.random.normal(0, 0.5, n_genes)
# Add some upregulated genes
log2_fc[:15] = np.random.normal(2.5, 0.5, 15)
# Add some downregulated genes
log2_fc[15:25] = np.random.normal(-2.5, 0.5, 10)

# Generate p-values
pvalues = np.random.uniform(0, 1, n_genes)
pvalues[:15] = np.random.uniform(0, 0.01, 15)  # Significant upregulated
pvalues[15:25] = np.random.uniform(0, 0.01, 10)  # Significant downregulated
padj = pvalues * 2  # Simple mock adjustment
padj[padj > 1] = 1

# Classification
significant = (np.abs(log2_fc) > 1) & (padj < 0.05)

# 5. Volcano Plot
fig, ax = plt.subplots(figsize=(8, 6))
ax.scatter(log2_fc[~significant], -np.log10(padj[~significant]),
          c='gray', alpha=0.5, s=30, label='Not Significant')
ax.scatter(log2_fc[significant], -np.log10(padj[significant]),
          c='#E63946', alpha=0.7, s=30, label='Significant')
ax.axhline(-np.log10(0.05), color='gray', linestyle='--', linewidth=1)
ax.axvline(-1, color='gray', linestyle='--', linewidth=1)
ax.axvline(1, color='gray', linestyle='--', linewidth=1)
ax.set_title('Volcano Plot', fontsize=14, fontweight='bold')
ax.set_xlabel('log2 Fold Change', fontsize=12)
ax.set_ylabel('-log10(adjusted p-value)', fontsize=12)
ax.legend(frameon=True, loc='upper right')
ax.grid(alpha=0.3)
plt.tight_layout()
plt.savefig(output_dir / 'volcano.png', dpi=300, bbox_inches='tight')
plt.close()

# 6. MA Plot
mean_expression = np.random.uniform(2, 12, n_genes)
fig, ax = plt.subplots(figsize=(8, 6))
ax.scatter(mean_expression[~significant], log2_fc[~significant],
          c='gray', alpha=0.5, s=30, label='Not Significant')
ax.scatter(mean_expression[significant], log2_fc[significant],
          c='#E63946', alpha=0.7, s=30, label='Significant')
ax.axhline(0, color='gray', linestyle='--', linewidth=1)
ax.set_title('MA Plot', fontsize=14, fontweight='bold')
ax.set_xlabel('log2 Mean Expression', fontsize=12)
ax.set_ylabel('log2 Fold Change', fontsize=12)
ax.legend(frameon=True, loc='upper right')
ax.grid(alpha=0.3)
plt.tight_layout()
plt.savefig(output_dir / 'ma_plot.png', dpi=300, bbox_inches='tight')
plt.close()

# 7. PCA plot
fig, ax = plt.subplots(figsize=(8, 6))
# Mock PCA coordinates
samples = ['control_1', 'control_2', 'treatment_1', 'treatment_2']
pc1 = [-15, -12, 18, 20]
pc2 = [5, -3, 8, -5]
colors_pca = ['#E41A1C', '#E41A1C', '#377EB8', '#377EB8']
for i, (sample, x, y, c) in enumerate(zip(samples, pc1, pc2, colors_pca)):
    ax.scatter(x, y, c=c, s=200, alpha=0.7)
    ax.text(x, y+2, sample, ha='center', fontsize=9)
ax.set_title('PCA of RNA-seq Samples', fontsize=14, fontweight='bold')
ax.set_xlabel('PC1 (65.2% variance)', fontsize=12)
ax.set_ylabel('PC2 (23.1% variance)', fontsize=12)
ax.grid(alpha=0.3)
# Add legend
from matplotlib.patches import Patch
legend_elements = [Patch(facecolor='#E41A1C', label='Control'),
                  Patch(facecolor='#377EB8', label='Treatment')]
ax.legend(handles=legend_elements, title='Condition', frameon=True)
plt.tight_layout()
plt.savefig(output_dir / 'pca.png', dpi=300, bbox_inches='tight')
plt.close()

# 8. Heatmap
fig, ax = plt.subplots(figsize=(8, 10))
# Generate mock expression data for 30 genes x 4 samples
data = np.random.randn(30, 4)
# Make some genes clearly upregulated in treatment
data[:10, 2:] += 2
# Make some genes clearly downregulated in treatment
data[10:15, 2:] -= 2
# Z-score normalize by row
data = (data - data.mean(axis=1, keepdims=True)) / data.std(axis=1, keepdims=True)

im = ax.imshow(data, cmap='RdBu_r', aspect='auto', vmin=-2, vmax=2)
ax.set_xticks(range(4))
ax.set_xticklabels(['control_1', 'control_2', 'treatment_1', 'treatment_2'], rotation=45, ha='right')
ax.set_yticks(range(30))
ax.set_yticklabels([f'Gene_{i+1}' for i in range(30)], fontsize=8)
ax.set_title('Top 30 Variable Genes', fontsize=14, fontweight='bold')
cbar = plt.colorbar(im, ax=ax)
cbar.set_label('Z-score', rotation=270, labelpad=15)
plt.tight_layout()
plt.savefig(output_dir / 'heatmap.png', dpi=300, bbox_inches='tight')
plt.close()

print(f"All plots generated successfully in {output_dir}")
