export function getCallbackData(payload: any): string | undefined {
  if (!payload?.adventureId) return;

  if (payload?.id) {
    return `adv_${payload.adventureId}:act_${payload.id}`;
  }

  if (payload?.command) {
    return `adv_${payload.adventureId}:${payload.command}`;
  }

  return;
}

export function getReplyKeyboardMarkup(actions?: any[]): any {
  if (!actions) return;

  return {
    inline_keyboard: [
      actions.map((action) => ({
        text: action.label,
        callback_data: getCallbackData(action.payload),
      })),
    ],
  };
}
