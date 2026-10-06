export type CodeToken = {
  readonly color: string;
  readonly text: string;
};

export type CodeLine = {
  readonly num: number;
  readonly tokens: readonly CodeToken[];
};

export const averageCodeLines: readonly CodeLine[] = [
  {
    num: 1,
    tokens: [
      { text: "def ", color: "text-[#cc7832]" },
      { text: "average", color: "text-[#ffc66d]" },
      { text: "(marks):", color: "text-[#a9b7c6]" },
    ],
  },
  {
    num: 2,
    tokens: [
      {
        text: '    """Return the mean of a list of marks."""',
        color: "text-[#6a8759]",
      },
    ],
  },
  { num: 3, tokens: [] },
  {
    num: 4,
    tokens: [
      { text: "    if ", color: "text-[#cc7832]" },
      { text: "not ", color: "text-[#cc7832]" },
      { text: "marks:", color: "text-[#a9b7c6]" },
    ],
  },
  {
    num: 5,
    tokens: [
      { text: "        return ", color: "text-[#cc7832]" },
      { text: "0", color: "text-[#6897bb]" },
    ],
  },
  { num: 6, tokens: [] },
  {
    num: 7,
    tokens: [
      { text: "    total = ", color: "text-[#a9b7c6]" },
      { text: "sum", color: "text-[#ffc66d]" },
      { text: "(marks)", color: "text-[#a9b7c6]" },
    ],
  },
  {
    num: 8,
    tokens: [
      { text: "    return ", color: "text-[#cc7832]" },
      { text: "total / len(marks)", color: "text-[#a9b7c6]" },
    ],
  },
];

export const vscodeCodeLines: readonly CodeLine[] = [
  {
    num: 1,
    tokens: [
      { text: "def ", color: "text-[#569cd6]" },
      { text: "average", color: "text-[#dcdcaa]" },
      { text: "(marks):", color: "text-[#d4d4d4]" },
    ],
  },
  {
    num: 2,
    tokens: [
      {
        text: '    """Return the mean of a list of marks."""',
        color: "text-[#ce9178]",
      },
    ],
  },
  { num: 3, tokens: [] },
  {
    num: 4,
    tokens: [
      { text: "    if ", color: "text-[#c586c0]" },
      { text: "not ", color: "text-[#569cd6]" },
      { text: "marks:", color: "text-[#d4d4d4]" },
    ],
  },
  {
    num: 5,
    tokens: [
      { text: "        return ", color: "text-[#c586c0]" },
      { text: "0", color: "text-[#b5cea8]" },
    ],
  },
  { num: 6, tokens: [] },
  {
    num: 7,
    tokens: [
      { text: "    total = ", color: "text-[#d4d4d4]" },
      { text: "sum", color: "text-[#dcdcaa]" },
      { text: "(marks)", color: "text-[#d4d4d4]" },
    ],
  },
  {
    num: 8,
    tokens: [
      { text: "    return ", color: "text-[#c586c0]" },
      { text: "total / len(marks)", color: "text-[#d4d4d4]" },
    ],
  },
];

export const vimCodeLines: readonly CodeLine[] = averageCodeLines;
