import { Config } from "@/types/config"

export const config: Config = {
    api: {
        // 1ページ毎の表示量
        searchReposPerPage: 15,

        // 最大表示量
        searchReposMaxResults: 1000,
    }
}