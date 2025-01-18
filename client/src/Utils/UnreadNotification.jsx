export const UnreadNotificationsFunc = (notifications) => {
    return notifications.filter((n) => n && n.isRead === false);
};
