import Link from 'next/link';
import { Terminal, BookOpen, Zap, Users } from 'lucide-react';

export const metadata = {
  title: 'UNIX for Biologists',
  description: 'Command-Line Genomics from Beginner to Expert',
};

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          UNIX for Biologists
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Command-Line Genomics from Beginner to Expert
        </p>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Master the command line for genomic data analysis. From basic navigation to advanced
          bioinformatics workflows, this guide transforms wet lab biologists into computational powerhouses.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <BookOpen className="w-5 h-5" />
            Read the Docs
          </Link>
          <Link
            href="https://learn.evomics.org/terminal"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            <Terminal className="w-5 h-5" />
            Interactive Practice
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <FeatureCard
          icon={<BookOpen className="w-6 h-6" />}
          title="Biology-First Approach"
          description="Every example uses real genomic data. FASTA, FASTQ, GFF, VCF files from actual research."
        />
        <FeatureCard
          icon={<Zap className="w-6 h-6" />}
          title="Modern Toolchain"
          description="Beyond grep and awk. Learn bioawk, seqtk, csvtk, parallel processing, and modern bioinformatics utilities."
        />
        <FeatureCard
          icon={<Terminal className="w-6 h-6" />}
          title="Beginner to Expert"
          description="Start with pwd and ls. End with automated pipelines processing thousands of samples on HPC clusters."
        />
        <FeatureCard
          icon={<Users className="w-6 h-6" />}
          title="Interactive Practice"
          description="Every concept links to hands-on exercises on Evomics Learn with instant feedback."
        />
      </div>

      {/* Quick Start */}
      <div className="border border-border rounded-lg p-8 bg-card">
        <h2 className="text-2xl font-bold mb-4">Who This Guide Is For</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Biology graduate students starting computational work</li>
          <li>• Wet lab biologists moving into bioinformatics</li>
          <li>• Bioinformaticians leveling up command-line skills</li>
          <li>• Anyone working with genomic data on UNIX/Linux</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          No programming experience required. Familiarity with basic biology assumed.
        </p>
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="text-primary mt-1">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
