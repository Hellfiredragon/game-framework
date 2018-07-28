import * as React from "react";
import * as ReactTestUtils from 'react-dom/test-utils';
import {getResource} from "./engine/resource";
import {getBuilding} from "./engine/building";
import {S_PER_UPDATE} from "./engine/constants";
import {ProductionClusterListItem} from "./views/production-cluster-list";
import {ClassType} from "react";
import {ReactElement} from "react";
import {Component} from "react";
import {ComponentClass} from "react";
import classNames = require("classnames");

export function obj2Arr(obj: any): number[] {
    const result: number[] = [];
    for (let i in obj) if (obj.hasOwnProperty(i)) {
        result[i] = obj[i];
    }
    return result;
}

export function Given(name: string, f: () => any) {
    describe("Given " + name, f);
}

export function When(action: string, f: () => any) {
    describe("When " + action, f);
}

export function Then(result: string, f: () => any) {
    it("Then " + result, f);
}

export function resourceHint(array: number[]): string {
    let hint = "";
    for (let i in array) {
        hint += array[i] + " " + getResource(Number(i)).name + ", ";
    }
    return hint.substr(0, hint.length - 2);
}

export function buildingHint(array: number[]): string {
    let hint = "";
    for (let i in array) {
        hint += getBuilding(Number(i)).name + " level " + array[i] + ", ";
    }
    return hint.substr(0, hint.length - 2);
}

export function cloneArray<T>(array: T[]): T[] {
    return ([] as T[]).concat(array);
}

export interface FrameContainer {
    frameCount: number;
}

export function withFrameVariation<T extends object>(arr: T[]): Array<T & FrameContainer> {
    const result: Array<T & FrameContainer> = [];
    arr.forEach(t => {
        result.push({ ...(t as any), frameCount: Math.round(100 / S_PER_UPDATE) });
    });
    return result;
}

export function findComponentWithType<T extends Component, C extends ComponentClass>(
    element: ReactElement<any>,
    type: ClassType<any, T, C>
) {
    const output = ReactTestUtils.renderIntoDocument(element) as React.Component;
    return ReactTestUtils.findRenderedComponentWithType(output, type);
}

export function scryComponentsWithType<T extends Component, C extends ComponentClass>(
    element: ReactElement<any>,
    type: ClassType<any, T, C>
) {
    const output = ReactTestUtils.renderIntoDocument(element) as React.Component;
    return ReactTestUtils.scryRenderedComponentsWithType(output, type);
}

export function findComponentWithClass<E extends Element>(
    element: ReactElement<any>,
    className: string
) {
    const output = ReactTestUtils.renderIntoDocument(element) as React.Component;
    return ReactTestUtils.findRenderedDOMComponentWithClass(output, className);
}
