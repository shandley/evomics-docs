#!/usr/bin/env Rscript
# Generate example plots for R for Biologists documentation

library(tidyverse)
library(palmerpenguins)
library(pheatmap)

# Set output directory
output_dir <- "public/images/r"
dir.create(output_dir, recursive = TRUE, showWarnings = FALSE)

# Helper function to save plots
save_plot <- function(filename, width = 8, height = 6) {
  ggsave(file.path(output_dir, filename), width = width, height = height, dpi = 300, bg = "white")
}

# ============================================================================
# VISUALIZATION.MDX PLOTS
# ============================================================================

# 1. Histogram
ggplot(penguins, aes(x = body_mass_g)) +
  geom_histogram(bins = 30, fill = "steelblue", color = "white") +
  labs(title = "Distribution of Body Mass",
       x = "Body Mass (g)",
       y = "Count") +
  theme_minimal()
save_plot("histogram.png")

# 2. Boxplot
ggplot(penguins, aes(x = species, y = body_mass_g, fill = species)) +
  geom_boxplot() +
  labs(title = "Body Mass by Species",
       x = "Species",
       y = "Body Mass (g)") +
  theme_minimal() +
  theme(legend.position = "none") +
  scale_fill_brewer(palette = "Set2")
save_plot("boxplot.png")

# 3. Scatterplot
ggplot(penguins, aes(x = flipper_length_mm, y = body_mass_g, color = species)) +
  geom_point(size = 2, alpha = 0.7) +
  labs(title = "Flipper Length vs Body Mass",
       x = "Flipper Length (mm)",
       y = "Body Mass (g)",
       color = "Species") +
  theme_minimal() +
  scale_color_brewer(palette = "Set1")
save_plot("scatterplot.png")

# 4. Growth curve line plot
growth_data <- tibble(
  time_hours = 0:24,
  od600 = c(0.05, 0.06, 0.08, 0.12, 0.18, 0.28, 0.42, 0.58,
            0.72, 0.84, 0.92, 0.96, 0.98, 0.99, 1.00, 1.00,
            1.01, 1.01, 1.02, 1.02, 1.02, 1.03, 1.03, 1.03, 1.03)
)

ggplot(growth_data, aes(x = time_hours, y = od600)) +
  geom_line(color = "steelblue", linewidth = 1) +
  geom_point(color = "steelblue", size = 2) +
  labs(title = "Bacterial Growth Curve",
       x = "Time (hours)",
       y = "OD600") +
  theme_minimal()
save_plot("lineplot.png")

# ============================================================================
# RNASEQ-ANALYSIS.MDX PLOTS
# ============================================================================

# Create example RNA-seq data
set.seed(42)
counts_matrix <- tibble(
  gene_id = paste0("Gene_", 1:100),
  control_1 = rpois(100, lambda = 500),
  control_2 = rpois(100, lambda = 500),
  treatment_1 = rpois(100, lambda = 500),
  treatment_2 = rpois(100, lambda = 500)
)

# Add some differentially expressed genes
counts_matrix$treatment_1[1:20] <- rpois(20, lambda = 2000)
counts_matrix$treatment_2[1:20] <- rpois(20, lambda = 2000)
counts_matrix$treatment_1[21:30] <- rpois(10, lambda = 100)
counts_matrix$treatment_2[21:30] <- rpois(10, lambda = 100)

# Long format
counts_long <- counts_matrix %>%
  pivot_longer(-gene_id, names_to = "sample", values_to = "counts") %>%
  mutate(
    condition = if_else(str_detect(sample, "control"), "Control", "Treatment"),
    replicate = str_extract(sample, "\\d+")
  )

# Calculate differential expression
de_results <- counts_long %>%
  group_by(gene_id, condition) %>%
  summarise(mean_counts = mean(counts), .groups = "drop") %>%
  pivot_wider(names_from = condition, values_from = mean_counts) %>%
  mutate(
    log2_fc = log2((Treatment + 1) / (Control + 1)),
    mean_expression = (Control + Treatment) / 2,
    pvalue = runif(n()),
    padj = p.adjust(pvalue, method = "BH"),
    significance = case_when(
      abs(log2_fc) > 1 & padj < 0.05 ~ "Significant",
      TRUE ~ "Not Significant"
    )
  )

# 5. Volcano Plot
ggplot(de_results, aes(x = log2_fc, y = -log10(padj), color = significance)) +
  geom_point(alpha = 0.6, size = 2) +
  geom_hline(yintercept = -log10(0.05), linetype = "dashed", color = "gray40") +
  geom_vline(xintercept = c(-1, 1), linetype = "dashed", color = "gray40") +
  scale_color_manual(values = c("Significant" = "#E63946", "Not Significant" = "gray60")) +
  labs(title = "Volcano Plot",
       x = "log2 Fold Change",
       y = "-log10(adjusted p-value)",
       color = "") +
  theme_minimal() +
  theme(legend.position = "top")
save_plot("volcano.png")

# 6. MA Plot
ggplot(de_results, aes(x = log2(mean_expression + 1), y = log2_fc, color = significance)) +
  geom_point(alpha = 0.6, size = 2) +
  geom_hline(yintercept = 0, linetype = "dashed", color = "gray40") +
  scale_color_manual(values = c("Significant" = "#E63946", "Not Significant" = "gray60")) +
  labs(title = "MA Plot",
       x = "log2 Mean Expression",
       y = "log2 Fold Change",
       color = "") +
  theme_minimal() +
  theme(legend.position = "top")
save_plot("ma_plot.png")

# 7. PCA plot (using built-in mtcars for simplicity)
pca_data <- counts_matrix %>%
  column_to_rownames("gene_id") %>%
  t() %>%
  prcomp(scale. = TRUE)

pca_df <- as.data.frame(pca_data$x[, 1:2]) %>%
  rownames_to_column("sample") %>%
  mutate(condition = if_else(str_detect(sample, "control"), "Control", "Treatment"))

variance_explained <- summary(pca_data)$importance[2, 1:2] * 100

ggplot(pca_df, aes(x = PC1, y = PC2, color = condition, label = sample)) +
  geom_point(size = 4) +
  geom_text(vjust = -1, size = 3) +
  labs(title = "PCA of RNA-seq Samples",
       x = sprintf("PC1 (%.1f%% variance)", variance_explained[1]),
       y = sprintf("PC2 (%.1f%% variance)", variance_explained[2]),
       color = "Condition") +
  theme_minimal() +
  scale_color_brewer(palette = "Set1")
save_plot("pca.png")

# 8. Heatmap of top variable genes
set.seed(42)
# Select top 30 genes by variance
gene_vars <- counts_matrix %>%
  pivot_longer(-gene_id, names_to = "sample", values_to = "counts") %>%
  group_by(gene_id) %>%
  summarise(variance = var(log2(counts + 1))) %>%
  arrange(desc(variance)) %>%
  slice_head(n = 30)

heatmap_data <- counts_matrix %>%
  filter(gene_id %in% gene_vars$gene_id) %>%
  column_to_rownames("gene_id")

# Save as PNG instead of using ggsave
png(file.path(output_dir, "heatmap.png"), width = 8, height = 10, units = "in", res = 300, bg = "white")
pheatmap(
  log2(heatmap_data + 1),
  scale = "row",
  clustering_distance_rows = "euclidean",
  clustering_distance_cols = "euclidean",
  main = "Top 30 Variable Genes",
  color = colorRampPalette(c("navy", "white", "firebrick3"))(50),
  fontsize = 10
)
dev.off()

cat("All plots generated successfully in", output_dir, "\n")
