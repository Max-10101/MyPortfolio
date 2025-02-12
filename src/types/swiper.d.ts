declare module 'swiper/css' {
    const styles: CSSModuleClasses;
    export default styles;
}

declare module 'swiper/css/navigation' {
    const styles: CSSModuleClasses;
    export default styles;
}

declare module 'swiper/css/pagination' {
    const styles: CSSModuleClasses;
    export default styles;
}

declare module 'swiper/css/effect-coverflow' {
    const styles: CSSModuleClasses;
    export default styles;
}

declare module 'swiper/css/bundle' {
    const styles: CSSModuleClasses;
    export default styles;
}

interface CSSModuleClasses {
    readonly [key: string]: string;
}
