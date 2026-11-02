// Easy en action : les réponses du modèle sont rejouées (le serveur de capture n'a pas de clé),
// l'app exécute réellement les outils demandés — mêmes stores, même synchro qu'en service.
let turn = 0;
export async function scriptEasy(page, steps) {
  await page.route('**/api/v1/agent/chat', async (route) => {
    const body = route.request().postDataJSON();
    const last = body.messages.at(-1);
    const isToolResult =
      Array.isArray(last.content) && last.content.some((b) => b.type === 'tool_result');
    const step = steps[Math.min(turn, steps.length - 1)];
    turn += 1;
    await new Promise((r) => setTimeout(r, step.delay ?? 900)); // le temps de réflexion du modèle
    if (step.tools && !isToolResult) {
      return route.fulfill({
        json: {
          content: step.tools.map((t, i) => ({
            type: 'tool_use',
            id: `toolu_capture_${turn}_${i}`,
            name: t.name,
            input: t.input,
          })),
          stopReason: 'tool_use',
        },
      });
    }
    return route.fulfill({
      json: { content: [{ type: 'text', text: step.text }], stopReason: 'end_turn' },
    });
  });
}

/** La transcription de la voix (Amazon Transcribe en service, absent du poste de capture) : la phrase dite. */
export async function scriptVoice(page, phrases) {
  let n = 0;
  await page.route('**/api/v1/agent/transcribe', async (route) => {
    const text = phrases[Math.min(n, phrases.length - 1)];
    n += 1;
    await new Promise((r) => setTimeout(r, 450));
    return route.fulfill({ json: { text } });
  });
}
