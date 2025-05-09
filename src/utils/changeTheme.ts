import { useDark } from "@vueuse/core"
import type { Ref } from 'vue'


export const isDark = useDark()

export const changeTheme = (value: boolean, refElement: Ref<HTMLElement | null | undefined>) => {
    const transiton = document.startViewTransition(() => {
        isDark.value = value
    })

    transiton.ready.then(() => {
        if (refElement.value) {
            const rect = refElement.value.getBoundingClientRect()
            const x = rect.left + rect.width / 2
            const y = rect.top + rect.height / 2
            const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
            const clipPath = [
                `circle(0 at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ]
            document.documentElement.animate({
                clipPath: isDark.value ? clipPath.reverse() : clipPath
            }, {
                duration: 500,
                easing: 'ease',
                pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
            })
        }
    })
}
