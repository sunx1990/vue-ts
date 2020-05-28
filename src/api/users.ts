import request from '@/utils/request';
export const login = (data: any) =>
    request({
        url: '/auth/managerLogin',
        method: 'post',
        data,
    });

export const getUserInfo = () =>
    request({
        url: '/web/manage/loginUser',
        method: 'get',
    });
