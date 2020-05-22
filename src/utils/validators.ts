export const validateUsername = (rule: any, value: string, callback: (e?: any) => void) => {
    if (value.length < 5) {
        callback(new Error('用户名最少5位'));
    } else {
        callback();
    }
};
export const validatePassword = (rule: any, value: string, callback: (e?: any) => void ) => {
    if (value.length < 5) {
        callback(new Error('密码最少5位'));
    } else {
        callback();
    }
};
