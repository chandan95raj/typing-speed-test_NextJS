import TypingTest from "@/components/TypingTest";

export const metadata = {
  title: "English Typing Test - Easy, Medium & Hard Passages",
  description:
    "Practice with English typing passages in three difficulty levels. Includes common words, punctuation and numbers to build accuracy and speed.",
  alternates: { canonical: "/typing-test/english" },
};

const commonWords =
  "the be to of and a in that have it for not on with he as you do at this but his by from they we say her she or an will my one all would there their";

export default function EnglishPage() {
  return (
    <div>
      <header className="page-head">
        <h1>English Typing Test</h1>
        <p className="lead">
          Practice with natural English text. Start with easy passages, then move up to
          paragraphs full of punctuation, numbers and longer words.
        </p>
      </header>

      <TypingTest initialMinutes={3} initialDifficulty="medium" />

      <section className="section prose">
        <h2>What the difficulty levels mean</h2>
        <ul>
          <li><strong>Easy:</strong> short sentences, everyday words and very little punctuation.</li>
          <li><strong>Medium:</strong> longer sentences, commas, hyphens and a wider vocabulary.</li>
          <li><strong>Hard:</strong> numbers, symbols, quotation marks, brackets and technical words.</li>
        </ul>

        <h2>Common English words to master</h2>
        <p>
          A small group of words makes up a huge part of everyday English text. Typing them
          without thinking is the fastest way to raise your overall speed:
        </p>
        <div className="card">
          <p style={{ margin: 0, fontFamily: "ui-monospace, Menlo, Consolas, monospace" }}>
            {commonWords}
          </p>
        </div>

        <h2>Tips for typing English text</h2>
        <ul>
          <li>Use both Shift keys so capital letters do not break your rhythm.</li>
          <li>Practice punctuation separately. Commas and full stops cost many typists time.</li>
          <li>Type whole words as one movement instead of letter by letter.</li>
          <li>Move to the hard level once you can stay above 95% accuracy on medium.</li>
        </ul>
      </section>
    </div>
  );
}