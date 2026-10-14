import ParagraphPractice from "@/components/ParagraphPractice";

export const metadata = {
  title: "Typing Test Paragraphs - Practice Specific Passages",
  description:
    "Browse typing practice paragraphs by difficulty and pick exactly the one you want to type. Untimed practice with live WPM and accuracy.",
  alternates: { canonical: "/typing-test/paragraphs" },
};

export default function ParagraphsPage() {
  return (
    <div>
      <header className="page-head">
        <h1>Typing Test Paragraphs</h1>
        <p className="lead">
          Choose a paragraph, type it from start to finish, and repeat it until you can do it
          quickly and without mistakes.
        </p>
      </header>

      <ParagraphPractice />

      <section className="section prose">
        <h2>Why practice with the same paragraph?</h2>
        <p>
          Repeating one paragraph lets you compare your results fairly. Since the text does not
          change, any improvement in WPM or accuracy is real progress and not luck.
        </p>

        <h2>How to use this page</h2>
        <ol>
          <li>Filter paragraphs by level and press Practice on the one you like.</li>
          <li>Type until the end. There is no countdown in this mode.</li>
          <li>Check your net WPM and accuracy, then press Esc to try again.</li>
          <li>Move on to a harder paragraph when you reach 95% accuracy.</li>
        </ol>
      </section>
    </div>
  );
}