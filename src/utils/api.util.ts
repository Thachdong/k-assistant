export async function getReadableStream(response: any) {
  return new ReadableStream({
    async pull(controller) {
      for await (const chunk of response) {
        controller.enqueue(new TextEncoder().encode(chunk.response));
      }
      controller.close();
    },
  });
}
