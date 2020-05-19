import http from '@/axios/http';

//  登陆
export function Login(params) {
    return http.post('/api/login', params);
}

// 验证账号
export function Verify(params) {
    return http.get('/api/verify', params);
}

//获取课程信息接口
export function getCourseByUser() {
    return http.get('/api/getCourseByUser');
}

//选择课程
export function selectCourse(params) {
    return http.post('/api/select', params);
}

//获取历史选课信息
export function getHistoryCourse(params) {
    return http.post('/api/getHistoryCourse',
        {
            type: params
        })
}

//退订当前课程
export function unsubscribe() {
    return http.post('/api/unsubscribe');
}

//查看成绩
export function getGrade(params) {
    return http.post('/api/getGrade',
        {
            id: params
        })
}

//设置成绩
export function setGrade(params) {
    return http.post('/api/setGrade', params)
}

//添加课程
export function addCourse(params) {
    return http.post('/api/addCourse', params);
}

//通过课程id获取选课人信息
export function getSelectClassByCourseId(params) {
    return http.get('/api/getSelectClassByCourseId', params);
}

//管理员获取历史课程
export function getHistCouAdmin(params) {
    return http.post('/api/getHistoryCourse', params);
}


//获取院系信息
export function getFacultyAll() {
    return http.get('/api/getFacultyAll');
}

//添加院系
export function insertFaculty(params) {
    return http.post('/api/insertFaculty', params);
}

//修改院系
export function updateFaculty(params) {
    return http.post('/api/updateFaculty', params);
}

//删除院系
export function deleteFaculty(params) {
    return http.get('/api/deleteFaculty', params)
}

//获取时间列表
export function getTime() {
    return http.get('/api/getTime');
}

//修改时间
export function updateTime(params) {
    return http.post('/api/updateTime', params)
}

//修改课程审核状态
export function updateCourseApproval(params) {
    return http.post('/api/updateCourseApproval', params)
}

//修改课程信息
export function updateCourse(params){
    return http.post('/api/updateCourse', params)
}
//删除课程
export function deleteCourse(params){
    return http.post('/api/deleteCourse', params)
}

//添加教室
export function insertRoomName(params){
    return http.post('/api/insertRoomName', params)
}

//删除教室
export function deleteRoomName(params){
    return http.get('/api/deleteRoomName', params)
}


//查询教室
export function getLikeRoomName(params){
    return http.get('/api/getLikeRoomName', params)
}