
export interface Config {
    api: Api
}

type Api = {
    searchReposPerPage: number;
    searchReposMaxResults: number;
}