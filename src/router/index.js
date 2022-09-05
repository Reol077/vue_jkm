import VueRouter from 'vue-router'
import WebsiteLogin from '../pages/WebsiteLogin'
import WebsiteRegister from '../pages/WebsiteRegister'
import WebsiteForget from '../pages/WebsiteForget'
import PasswordReset from '../pages/PasswordReset'
import ImgUpload from '../pages/ImgUpload'
import PersonalCenter from '../pages/PersonalCenter'
import PersonalInformation from '../pages/PersonalInformation'
import UploadSituation from '../pages/UploadSituation'

//创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/WebsiteLogin',
            name: 'login',
            component: WebsiteLogin,
        },
        {
            path: '/WebsiteForget',
            name: 'forget',
            component: WebsiteForget,
        },
        {
            path: '/WebsiteRegister',
            name: 'register',
            component: WebsiteRegister
        },
        {
            path: '/PasswordReset',
            name: 'reset',
            component: PasswordReset
        },
        {
            path: '/ImgUpload',
            name: 'upload',
            component: ImgUpload

        },
        {
            path: '/PersonalCenter',
            name: "personal",
            component: PersonalCenter,
            children: [
                {
                    name: 'information',
                    path: 'PersonalInformation',
                    component: PersonalInformation
                },
                {
                    name:'situation',
                    path:'UploadSituation',
                    component: UploadSituation
                }

            ]
        },

    ]
})
