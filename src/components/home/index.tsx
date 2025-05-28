import {useEffect, useState} from "react";
import type {FC} from "react";
import { setLocales, t, setLang } from 'translator-client';
import dayjs from 'dayjs';
import { CalendarDaysIcon, LifebuoyIcon, BookOpenIcon , CommandLineIcon } from '@heroicons/react/24/outline';
import locales from '../../locales/complete.json';


setLocales(locales);
const userLanguage = navigator.language || navigator.languages || 'en' as any

const finalLang = userLanguage === 'en' ? userLanguage : 'zh'

setLang(finalLang);

const HomePage: FC = () => {
    const [lang,_setLang] = useState<'zh'|'en'>(finalLang);

    useEffect(() => {
        if(window.gtag) {
            window.gtag('event', 'pageView', {
                time:dayjs().format('YYYY年MM月DD日 HH时mm分ss秒')
            });
        }
    }, []);

    const onClick = () => {
        _setLang(pre => {
            const _lang =  pre ==='zh' ? 'en' : 'zh';
            setLang(_lang);
            if(window.gtag) {
                window.gtag('event', 'toggleLang', {
                    lang:_lang
                });
            }
            return _lang;
        })
    }

    return (
        <div className="flex flex-col text-white max-w-[400px] p-10 h-[100%]">
            <div className="flex justify-end">
                <div className="flex items-center text-xs mb-10">
                    <div className="w-2xl mr-[5px]">
                        <svg t="1687277604799" className="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="2181" id="mx_n_1687277604800" width="16"
                             height="16">
                            <path
                                d="M512 80C273.6 80 80 273.6 80 512s193.6 432 432 432 432-193.6 432-432S750.4 80 512 80z m366.4 400h-112c-4.8-118.4-36.8-222.4-86.4-294.4C790.4 241.6 867.2 352 878.4 480zM480 148.8V480h-158.4c6.4-164.8 73.6-302.4 158.4-331.2zM480 544v331.2c-84.8-28.8-152-166.4-158.4-331.2H480z m64 331.2V544h158.4c-6.4 164.8-73.6 302.4-158.4 331.2zM544 480V148.8c84.8 28.8 152 166.4 158.4 331.2H544zM342.4 185.6c-49.6 72-81.6 176-86.4 294.4H144c12.8-128 89.6-238.4 198.4-294.4zM145.6 544h112c4.8 118.4 36.8 222.4 86.4 294.4C233.6 782.4 156.8 672 145.6 544z m536 294.4c49.6-72 81.6-176 86.4-294.4h112c-12.8 128-89.6 238.4-198.4 294.4z"
                                fill="#ffffff" p-id="2182"></path>
                        </svg>
                    </div>
                    <div className="flex items-center cursor-pointer" onClick={onClick}><a className={`${lang === 'en' ? 'text-indigo-600' : ''}`} >EN</a><span className="ml-1 mr-1">/</span><a className={`${lang === 'en' ? '' : 'text-indigo-600'}`}>ZH</a></div>
                </div>
            </div>
            <div className="flex items-center justify-between mb-10">
                <div className="flex-initial mr-2 pt-5">
                    <h1 className="font-semibold text-2xl mb-5">Hello,it's me.</h1>
                    <h3 className="font-medium text-xm">My name is ryanwang.</h3>
                </div>
                <div className="flex-initial w-20">
                    <img crossOrigin="anonymous" className="w-full rounded-s-full rounded-e-full" src="https://source.binlin.wang/ryanwang.png" alt="my photo"/>
                </div>
            </div>
            <div className="flex flex-col break-words items-center  justify-center">
                <div className="leading-7">
                    <p className="mb-5">{
                        t('我的花名（或者是笔名）叫“不换”，英文名叫 ryanwang。在现实生活中你可以叫我 “小王”，在游戏里，我有一个独一无二的名字叫 “林温芙”，很荣幸你能在这里看到我的个人介绍。')
                    }</p>
                    <p className="mb-5">{
                        t('我是一名拥有 4年+ 经验的前端开发者，比较熟悉 react，擅长组件库的开发、治理和维护，精通前端领域所有框架的拼写，擅长各种 API 的阅读和调用。')
                    }</p>
                    <p className="mb-5">
                        {
                            t('热爱工作，也同样热爱开源社区，下班后喜欢静下心来研究一些奇奇怪怪的东西，你可以在')
                        } <a className="text-indigo-500" href="https://github.com/bigbigDreamer">GitHub</a> {
                        t('上找到我，也可以使用')} <a className="text-indigo-500" href="mailto:email@binlin.wang" type="email"> Email </a> {t('联系我')}。
                    </p>
                    <p>{t('我随着兴趣爱好写了一些小玩意，你可以尽情欣赏～')}</p>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-10 pb-10">
                <a href="https://weekly.binlin.wang" className="flex flex-col items-center cursor-pointer" data-tooltip-id="weekly-tooltip" >
                    <CalendarDaysIcon className="h-6 w-6 text-white mb-1" aria-hidden="true" />
                    <span>{t('周刊')}</span>
                </a>
                <a href="https://ts-handbook.binlin.wang" className="flex flex-col items-center cursor-pointer" data-tooltip-id="QRposter-tooltip" >
                    <BookOpenIcon className="h-6 w-6 text-white mb-1" aria-hidden="true" />
                    <span>{t('TS手札')}</span>
                </a>
                <a href="https://blog.binlin.wang" className="flex flex-col items-center cursor-pointer" data-tooltip-id="blog-tooltip" >
                    <LifebuoyIcon className="h-6 w-6 text-white mb-1" aria-hidden="true" />
                    <span>{t('博客')}</span>
                </a>
                <a href="https://github.com/bigbigDreamer/xumi" className="flex flex-col items-center cursor-pointer" data-tooltip-id="xumi-tooltip">
                    <CommandLineIcon className="h-6 w-6 text-white mb-1" aria-hidden="true" />
                    <span>{t('须弥')}</span>
                </a>
            </div>
            <div className="flex flex-col break-words items-center  justify-center">
                <div className="leading-7">
                    <p className="mb-5">{
                        t('最后，我还是公众号("不换的随想乐园")的作者，平时喜欢总结和输出一些知识理解和经验总结，如果你也感兴趣，欢迎来关注我哦~')
                    }</p>
                </div>
            </div>
            <div className="w-[100%] h-[100%] pb-10"><img loading="lazy" className="w-[100%] h-[100%]" src="https://bigdreamerblog.oss-cn-beijing.aliyuncs.com/nextBlog/扫码_搜索联合传播样式-白色版.png?x-oss-process=image/auto-orient,1/interlace,1/quality,q_1/format,webp" alt=""/></div>
        </div>
    )
};


export default HomePage
