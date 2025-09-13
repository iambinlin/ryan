import {useEffect, useState, useRef} from "react";
import type {FC} from "react";
import { setLocales, t, setLang } from 'translator-client';
import dayjs from 'dayjs';
import { CalendarDaysIcon, LifebuoyIcon, BookOpenIcon , CommandLineIcon } from '@heroicons/react/24/outline';
import locales from '../../locales/complete.json';


setLocales(locales);
const userLanguage = navigator.language || navigator.languages || 'en' as any

const finalLang = userLanguage === 'en' ? userLanguage : 'zh'

setLang(finalLang);

// 加载屏幕组件
const LoadingScreen: FC<{ phase: number; showParticles: boolean }> = ({ phase, showParticles }) => {
    return (
        <div className={`loading-screen ${phase >= 3 ? 'fade-out' : ''}`}>
            <div className="loading-content">
                {/* 中央Logo动画 */}
                <div className={`loading-logo ${phase >= 1 ? 'animate' : ''}`}>
                    <div className="logo-ring"></div>
                    <div className="logo-ring ring-2"></div>
                    <div className="logo-ring ring-3"></div>
                    
                    {/* 双语Logo */}
                    <div className="logo-text-container">
                        <div className="logo-text-main">
                            <span className="logo-english">Ryan</span>
                            <span className="logo-dot">.</span>
                            <span className="logo-chinese">不换</span>
                        </div>
                        <div className="logo-subtitle">Developer</div>
                    </div>
                </div>
                
                {/* 加载文本 */}
                <div className={`loading-text ${phase >= 1 ? 'show' : ''}`}>
                    <div className="glitch-text" data-text="WELCOME TO MY WORLD...">WELCOME TO MY WORLD...</div>
                </div>
                
                {/* 进度条 */}
                <div className={`progress-bar ${phase >= 1 ? 'animate' : ''}`}>
                    <div className="progress-fill"></div>
                </div>
            </div>
            
            {/* 粒子爆发效果 */}
            {showParticles && (
                <div className="particle-explosion">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div 
                            key={i} 
                            className="particle" 
                            style={{
                                '--delay': `${i * 0.02}s`,
                                '--angle': `${(i * 7.2)}deg`,
                                '--distance': `${100 + Math.random() * 200}px`
                            } as React.CSSProperties}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// 懒加载组件
const LazyImage: FC<{
    src: string;
    alt: string;
    className?: string;
    placeholder?: string;
}> = ({ src, alt, className = '', placeholder }) => {
    const [imageSrc, setImageSrc] = useState(placeholder || '');
    const [imageLoaded, setImageLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        let observer: IntersectionObserver;
        
        if (imgRef.current) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setImageSrc(src);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );
            
            observer.observe(imgRef.current);
        }

        return () => {
            if (observer && imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [src]);

    const handleLoad = () => {
        setImageLoaded(true);
    };

    // 检查是否是头像
    const isProfileAvatar = className.includes('profile-avatar');
    
    return (
        <div className={isProfileAvatar ? 'profile-avatar-wrapper' : 'qr-code-container'}>
            <img
                ref={imgRef}
                src={imageSrc}
                alt={alt}
                className={isProfileAvatar ? `profile-avatar ${imageLoaded ? 'loaded' : 'loading'}` : `qr-code ${imageLoaded ? 'loaded' : 'loading'}`}
                onLoad={handleLoad}
                loading="lazy"
                crossOrigin={isProfileAvatar ? "anonymous" : undefined}
            />
        </div>
    );
};

const HomePage: FC = () => {
    const [lang,_setLang] = useState<'zh'|'en'>(finalLang);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [showParticles, setShowParticles] = useState(false);
    const [animationPhase, setAnimationPhase] = useState(0);

    useEffect(() => {
        if(window.gtag) {
            window.gtag('event', 'pageView', {
                time:dayjs().format('YYYY年MM月DD日 HH时mm分ss秒')
            });
        }

        // 鼠标追踪效果
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        // 入场动画序列
        const loadingSequence = async () => {
            // 阶段1: 加载动画 (2秒)
            setTimeout(() => setAnimationPhase(1), 500);
            
            // 阶段2: 粒子爆发 (1秒)
            setTimeout(() => {
                setShowParticles(true);
                setAnimationPhase(2);
            }, 2000);
            
            // 阶段3: 内容显示 (0.5秒后)
            setTimeout(() => {
                setIsLoading(false);
                setAnimationPhase(3);
            }, 3000);
        };

        loadingSequence();
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => window.removeEventListener('mousemove', handleMouseMove);
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
        <>
            {/* 加载屏幕 */}
            {isLoading && (
                <LoadingScreen phase={animationPhase} showParticles={showParticles} />
            )}
            
            {/* 主内容 */}
            <div className={`main-content ${!isLoading ? 'show' : ''}`}>
                <div className="min-h-screen flex items-center justify-center p-6">
                    {/* Mouse Glow Effect */}
                    <div 
                        className="mouse-glow"
                        style={{
                            left: mousePosition.x - 100,
                            top: mousePosition.y - 100,
                        }}
                    />
                    
                    <div className="max-w-4xl w-full">
                        {/* Header Section */}
                        <header className={`text-center mb-16 entrance-animation ${!isLoading ? 'phase-1' : ''}`}>
                            <div className="flex justify-end mb-8">
                                <div className="lang-toggle" onClick={onClick}>
                                    <span className={`lang-option ${lang === 'en' ? 'active' : ''}`}>EN</span>
                                    <span className="mx-2 text-slate-400">|</span>
                                    <span className={`lang-option ${lang === 'zh' ? 'active' : ''}`}>ZH</span>
                                </div>
                            </div>
                            
                            <div className="profile-section">
                                <div className={`profile-image-container entrance-animation ${!isLoading ? 'phase-2' : ''}`}>
                                    <LazyImage
                                        src="https://source.binlin.wang/ryanwang.png"
                                        alt="my photo"
                                        className="profile-avatar-container"
                                        placeholder="data:image/svg+xml,%3Csvg width='140' height='140' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='70' cy='70' r='70' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='12'%3ELoading...%3C/text%3E%3C/svg%3E"
                                    />
                                </div>
                                <h1 className={`profile-name entrance-animation ${!isLoading ? 'phase-3' : ''}`}>Hello, I'm Ryan Wang</h1>
                                <p className={`profile-title entrance-animation ${!isLoading ? 'phase-4' : ''}`}>Frontend Developer & Open Source Enthusiast</p>
                            </div>
                        </header>

                        {/* Main Content */}
                        <main className="layered-content">
                            {/* About Section - Layer 1 */}
                            <section className={`content-layer layer-1 entrance-animation ${!isLoading ? 'phase-5' : ''}`}>
                                <h2 className="section-title">About Me</h2>
                                <div className="prose-content">
                                    <p className="prose-block">{t('我的花名（或者是笔名）叫"不换"，英文名叫 ryanwang。在现实生活中你可以叫我 "小王"，在游戏里，我有一个独一无二的名字叫 "林温芙"，很荣幸你能在这里看到我的个人介绍。')}</p>
                                    <p className="prose-block">{t('我是一名拥有 4年+ 经验的前端开发者，比较熟悉 react，擅长组件库的开发、治理和维护，精通前端领域所有框架的拼写，擅长各种 API 的阅读和调用。')}</p>
                                    <p className="prose-block">
                                        {t('热爱工作，也同样热爱开源社区，下班后喜欢静下心来研究一些奇奇怪怪的东西，你可以在')} 
                                        <a className="text-link" href="https://github.com/bigbigDreamer">GitHub</a> 
                                        {t('上找到我，也可以使用')} 
                                        <a className="text-link" href="mailto:email@binlin.wang" type="email">Email</a> 
                                        {t('联系我')}。
                                    </p>
                                </div>
                            </section>

                            {/* Projects Section - Layer 2 */}
                            <section className={`content-layer layer-2 entrance-animation ${!isLoading ? 'phase-6' : ''}`}>
                                <h2 className="section-title">My Projects</h2>
                                <p className="section-subtitle">{t('我随着兴趣爱好写了一些小玩意，你可以尽情欣赏～')}</p>
                                <div className="projects-layer">
                                    <a href="https://weekly.binlin.wang" className={`project-item entrance-animation ${!isLoading ? 'phase-7' : ''}`}>
                                        <CalendarDaysIcon className="project-icon" />
                                        <span className="project-name">{t('周刊')}</span>
                                    </a>
                                    <a href="https://ts-handbook.binlin.wang" className={`project-item entrance-animation ${!isLoading ? 'phase-8' : ''}`}>
                                        <BookOpenIcon className="project-icon" />
                                        <span className="project-name">{t('TS手札')}</span>
                                    </a>
                                    <a href="https://blog.binlin.wang" className={`project-item entrance-animation ${!isLoading ? 'phase-9' : ''}`}>
                                        <LifebuoyIcon className="project-icon" />
                                        <span className="project-name">{t('博客')}</span>
                                    </a>
                                    <a href="https://github.com/bigbigDreamer/xumi" className={`project-item entrance-animation ${!isLoading ? 'phase-10' : ''}`}>
                                        <CommandLineIcon className="project-icon" />
                                        <span className="project-name">{t('须弥')}</span>
                                    </a>
                                </div>
                            </section>

                            {/* WeChat Section - Layer 3 */}
                            <section className={`content-layer layer-3 entrance-animation ${!isLoading ? 'phase-11' : ''}`}>
                                <h2 className="section-title">Follow Me</h2>
                                <div className="wechat-layer">
                                    <div className="wechat-content">
                                        <p className="prose-block">{t('最后，我还是公众号("不换的随想乐园")的作者，平时喜欢总结和输出一些知识理解和经验总结，如果你也感兴趣，欢迎来关注我哦~')}</p>
                                    </div>
                                    <div className="wechat-visual">
                                        <LazyImage
                                            src="https://bigdreamerblog.oss-cn-beijing.aliyuncs.com/nextBlog/扫码_搜索联合传播样式-白色版.png?x-oss-process=image/auto-orient,1/interlace,1/quality,q_1/format,webp"
                                            alt="WeChat QR Code"
                                            className="qr-image"
                                            placeholder="data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666'%3ELoading...%3C/text%3E%3C/svg%3E"
                                        />
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
};


export default HomePage
