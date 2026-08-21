import { useBrowserAI } from './hooks/browser-ai';

function App() {
  const {
    prompt,
    setPrompt,
    isLoading,
    generateResponse,
    result,
    elapsedTime,
  } = useBrowserAI();

  return (
    <>
      <h1>demo</h1>

      <p>{result}</p>
      <input
        type='text'
        name='prompt'
        disabled={isLoading}
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />
      <button disabled={isLoading} onClick={() => generateResponse(prompt)}>
        Submit
      </button>
      <br />
      {/* Format the elapsed time. */}
      {elapsedTime > 0 && (
        <p>Elapsed time: {Math.round(elapsedTime / 1000)} seconds</p>
      )}
    </>
  );
}

export default App;
