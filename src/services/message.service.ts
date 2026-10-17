export const getGroupMessagesService = async (groupId: string, userId: string) => {
  // TODO: Call message repository when implemented
  const messages = [
    {
      _id: 'dummy_message_id',
      sender: { _id: userId, username: 'user' },
      group: groupId,
      content: 'Hello, this is a dummy message',
      createdAt: new Date(),
    },
  ];

  return messages;
};
