import questions from '../data/questions.json'
import Quiz from './components/Quiz';

export default function Home() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="flex flex-col items-center p-5">
          <h1 className="mb-8 text-3xl font-bold">Quiz App</h1>
          <Quiz questions={questions} />
        </div>
      </div>
    </section>
  );
}