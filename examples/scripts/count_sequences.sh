#!/bin/bash
# Count sequences in a FASTA file
# Usage: ./count_sequences.sh input.fasta

if [ $# -eq 0 ]; then
    echo "Usage: $0 <fasta_file>"
    exit 1
fi

FASTA_FILE=$1

if [ ! -f "$FASTA_FILE" ]; then
    echo "Error: File '$FASTA_FILE' not found"
    exit 1
fi

# Count headers (lines starting with >)
COUNT=$(grep -c "^>" "$FASTA_FILE")

echo "Number of sequences in $FASTA_FILE: $COUNT"
