import ThemeSettings from "../../components/ThemeSettings";

export default function SettingsPage() {
  return (
    <main className="bg-slate-50 px-6 py-16 text-slate-900">

      <div className="mx-auto max-w-4xl">

        <p className="font-semibold text-blue-700">
          CSE3CWA Assessment 1
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Customise the appearance of the Phoneme Activity Builder.
        </p>

        <ThemeSettings />

      </div>

    </main>
  );
}