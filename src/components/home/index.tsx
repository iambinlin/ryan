import { useState } from "react";
import type { FC } from "react";
import { setLang, setLocales, t } from "translator-client";
import locales from "../../locales/complete.json";

type Lang = "zh" | "en";

setLocales(locales);

const getInitialLang = (): Lang => {
    if (typeof navigator === "undefined") {
        return "zh";
    }

    const language = navigator.languages?.[0] ?? navigator.language ?? "zh";
    return language.toLowerCase().startsWith("en") ? "en" : "zh";
};

const initialLang = getInitialLang();
setLang(initialLang);

const HomePage: FC = () => {
    const [lang, setCurrentLang] = useState<Lang>(initialLang);

    const focusItems = [
        {
            title: t("AI Agent"),
            description: t("关注 Agent 如何拆解任务、调用工具、保留上下文，并在关键节点接受人的判断。"),
        },
        {
            title: t("产品体验"),
            description: t("喜欢把复杂流程压成清楚、可解释、能被反复使用的体验。"),
        },
        {
            title: t("工程工具"),
            description: t("长期整理脚本、CLI、浏览器自动化和文档工作流，让日常工作少一点重复劳动。"),
        },
    ];

    const notes = [
        t("把模型能力放进真实工作流里，而不是只停在一次漂亮演示。"),
        t("把工具做得可理解、可回退、可验证。"),
        t("把个人知识、写作和工程实践慢慢沉淀下来。"),
    ];

    const links = [
        { label: "Blog", href: "https://blog.binlin.wang" },
        { label: "GitHub", href: "https://github.com/iambinlin" },
    ];

    const toggleLang = () => {
        setCurrentLang((previous) => {
            const nextLang = previous === "zh" ? "en" : "zh";
            setLang(nextLang);
            return nextLang;
        });
    };

    return (
        <div className="paper-page heti">
            <nav className="paper-nav" aria-label={t("页面导航")}>
                <a className="paper-brand" href="#top" aria-label="Ryan">
                    <span className="paper-mark" aria-hidden="true" />
                    <span>Ryan</span>
                </a>
                <div className="paper-nav-links">
                    {links.map((link) => (
                        <a key={link.href} href={link.href}>
                            {link.label}
                        </a>
                    ))}
                    <button className="language-switch" type="button" onClick={toggleLang} aria-label={t("切换语言")}>
                        {lang === "zh" ? "EN" : "中文"}
                    </button>
                </div>
            </nav>

            <main className="paper-shell" id="top">
                <header className="hero-section">
                    <p className="eyebrow">{t("不换 / Ryan Wang")}</p>
                    <h1>{t("把想法、工具和文字慢慢整理成可复用的东西。")}</h1>
                    <p className="hero-copy">
                        {t("我关注 AI Agent、产品体验和工程工具。比起热闹的概念，我更在意一个系统能不能被理解、被验证，并且真的帮人把事情做好。")}
                    </p>
                    <div className="hero-actions" aria-label={t("个人链接")}>
                        <a href="https://blog.binlin.wang">{t("阅读博客")}</a>
                        <a href="https://github.com/iambinlin">GitHub</a>
                    </div>
                </header>

                <section className="paper-section intro-section" aria-labelledby="about-title">
                    <h2 id="about-title">{t("关于")}</h2>
                    <div className="section-copy">
                        <p>{t("我习惯从一个具体问题开始：哪里重复、哪里不确定、哪里需要人来确认。然后把模型、工具、上下文和界面串起来，做成能被长期使用的流程。")}</p>
                        <p>{t("这个页面不想讲得太满。它更像一个入口：记录我正在关注的方向，也把博客、代码和联系方式放在同一个安静的地方。")}</p>
                    </div>
                </section>

                <section className="paper-section focus-section" aria-labelledby="focus-title">
                    <h2 id="focus-title">{t("正在关注")}</h2>
                    <div className="focus-list">
                        {focusItems.map((item) => (
                            <article className="focus-row" key={item.title}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="paper-section notes-section" aria-labelledby="notes-title">
                    <h2 id="notes-title">{t("最近的想法")}</h2>
                    <ol>
                        {notes.map((note) => (
                            <li key={note}>{note}</li>
                        ))}
                    </ol>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
