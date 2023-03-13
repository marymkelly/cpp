import { Method } from "axios"

type DatabaseCollection = 'user' | 'project';

export interface RouteParams<T> {
    url: string
    alias?: DatabaseCollection
    methods: Method[]
    data?: T
}

type ApiRoute = [string, RouteParams<unknown>][]