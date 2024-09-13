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

export async function getReadableStreamFormChatResponse(stream: any) {
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          controller.enqueue(new TextEncoder().encode(chunk.message.content));
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
}
