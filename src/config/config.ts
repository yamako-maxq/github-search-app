import { Config } from "@/types/config"

export const config: Config = {
    api: {
        // 1ページ毎の表示量
        searchReposPerPage: 30,

        // 最大表示量
        searchReposMaxResults: 1000,
    }
}