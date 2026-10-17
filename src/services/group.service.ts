export const createGroupService = async (data: { name: string; description?: string }, userId: string) => {
  // TODO: Call group repository when implemented
  const group = {
    _id: 'dummy_group_id',
    name: data.name,
    description: data.description,
    admin: userId,
    members: [userId],
    createdAt: new Date(),
  };

  return group;
};

export const getGroupsService = async (userId: string) => {
  // TODO: Call group repository when implemented
  const groups = [
    {
      _id: 'dummy_group_id_1',
      name: 'General Chat',
      description: 'A dummy group',
      admin: userId,
      members: [userId],
      createdAt: new Date(),
    },
  ];

  return groups;
};

export const joinGroupService = async (groupId: string, userId: string) => {
  // TODO: Call group repository when implemented
  const group = {
    _id: groupId,
    name: 'Dummy Group',
    members: [userId],
  };

  return group;
};
