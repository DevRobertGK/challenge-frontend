import { Position } from "./position";

export interface Order {
    id: string;
    name: string;
    created: Date;
    updated: Date;
    positions: Position[]
}