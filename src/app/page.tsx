import { AiForm } from "@/components/AiForm/AiForm";

export default function Home() {
  return (
    <main className="w-full p-8">
      <section className="max-w-screen-sm mx-auto">
        <h1 className="text-4xl font-black text-center mb-8">LCD Copilot</h1>
        <AiForm />
      </section>
    </main>
  );
}
