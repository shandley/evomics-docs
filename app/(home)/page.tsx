import Link from 'next/link';
import { Terminal, BarChart3, Dna, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Evomics Documentation',
  description: 'Comprehensive guides for computational biology and bioinformatics',
};

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Evomics Documentation
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Master Computational Biology
        </p>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Comprehensive guides covering everything from command-line basics to advanced
          bioinformatics workflows. Part of the Evomics Learning Ecosystem.
        </p>
        <Link
          href="https://learn.evomics.org"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          <Terminal className="w-5 h-5" />
          Interactive Practice Platform
        </Link>
      </div>

      {/* Guides Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Available Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <GuideCard
            icon={<Terminal className="w-8 h-8" />}
            title="UNIX for Biologists"
            description="Command-line genomics from beginner to expert. Master grep, sed, awk, and modern bioinformatics utilities."
            href="/unix"
            status="available"
            topics={['Command Line', 'Text Processing', 'HPC Clusters', 'Scripting']}
          />

          <GuideCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="R for Biologists"
            description="Data analysis and visualization with R and tidyverse. From basics to advanced statistical methods."
            href="/r"
            status="available"
            topics={['tidyverse', 'ggplot2', 'Statistics', 'Data Wrangling']}
          />

          <GuideCard
            icon={<Dna className="w-8 h-8" />}
            title="Virome Analysis"
            description="Viral metagenomics and discovery. Tools and workflows for studying viral communities."
            href="/virome"
            status="coming-soon"
            topics={['Viral Discovery', 'Assembly', 'Classification', 'Ecology']}
          />

          <GuideCard
            icon={<BookOpen className="w-8 h-8" />}
            title="Statistics for Biologists"
            description="Statistical methods for biological data. Hypothesis testing, regression, and experimental design."
            href="/stats"
            status="coming-soon"
            topics={['Hypothesis Testing', 'Regression', 'Design', 'Power Analysis']}
          />
        </div>
      </div>

      {/* Ecosystem Overview */}
      <div className="border border-border rounded-lg p-8 bg-card">
        <h2 className="text-2xl font-bold mb-4">Multi-Modal Learning</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              Interactive Practice
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Hands-on exercises with instant feedback at{' '}
              <Link href="https://learn.evomics.org" className="text-primary hover:underline">
                learn.evomics.org
              </Link>
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Comprehensive Guides
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Deep explanations, advanced techniques, and reference materials (you are here)
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Alternate between reading and practicing for optimal learning. Each guide links to relevant
          exercises on the interactive platform.
        </p>
      </div>
    </main>
  );
}

function GuideCard({
  icon,
  title,
  description,
  href,
  status,
  topics,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  status: 'available' | 'coming-soon';
  topics: string[];
}) {
  const CardContent = (
    <div className={`border border-border rounded-lg p-6 h-full flex flex-col ${
      status === 'available' ? 'hover:border-primary/50 cursor-pointer' : 'opacity-60'
    } transition-colors`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="text-primary mt-1">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-xl">{title}</h3>
            {status === 'coming-soon' && (
              <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                Coming Soon
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (status === 'available') {
    return <Link href={href}>{CardContent}</Link>;
  }

  return CardContent;
}
