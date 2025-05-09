import type { App } from 'vue';
import { useLayoutStore } from '@/stores/useLayoutStore';

const deBounce = (fn: () => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    };
};

const globalPlugin = {
    install(app: App) {
        // 将全局方法添加到 app.config.globalProperties 中
        app.config.globalProperties.$deBounce = deBounce;
        initWindowWidth();
    }
};

const initWindowWidth = () => {
    const layoutStore = useLayoutStore()
    const resizeHandler = deBounce(() => {
        layoutStore.setWindowWidth(window.innerWidth)
    }, 200)
    window.addEventListener('resize', resizeHandler)
}

export default globalPlugin;    