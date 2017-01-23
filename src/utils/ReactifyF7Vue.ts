import * as React from 'react';
import {camelCase} from 'change-case';

import {IFramework7AppContext} from '../components/Framework7App';
import {reactifyVue} from './reactify-vue/ReactifyVue';
import {Dom7} from '../Framework7';
import {Template7} from '../Framework7';

export interface IReactifyF7VueArgs {
    component: any;
    tag: string;
    slots?: string[];
    args?: any;
    instantiatedComponents?: (React.ComponentClass<any> | React.StatelessComponent<any>)[];
    events?: string[];
    mixin?: any;
}

export const reactifyF7Vue = <TProps>(args: IReactifyF7VueArgs) => {
    const innerComponent = reactifyVue<TProps>({
        component: args.component,
        tag: args.tag,
        slots: !args.slots ? null : args.slots.reduce((slotMap, currentSlotName) => {
            return { ...slotMap, [currentSlotName]: camelCase(currentSlotName) + 'Slot' };
        }, {}),
        events: !args.events ? null : args.events.reduce((eventMap, currentEventName) => {
            return { ...eventMap, [currentEventName]: camelCase('on-' + currentEventName.split(':').join('-')) };
        }, {}),
        instantiatedComponents: args.instantiatedComponents,
        args: {
            ...args.args,
            $$: Dom7,
            $t7: Template7
        },
        mixin: args.mixin
    });

    const reactClass = React.createClass<TProps, any>({
        getInitialState: function () {
            ((this.context as any).framework7AppContext as IFramework7AppContext).getFramework7(f7 => {
                this.framework7 = f7;
            });

            Object.defineProperty(args.component, '$f7', {
                get: () => this.framework7,
                enumerable: true,
                configurable: true
            });            

            return null;
        },

        render: function() {
            const props = this.props;

            const innerEl = React.createElement(innerComponent, {
                ...props,
                $theme: { material: false, ios: true },
                __onMount: (self) => {
                    ((this.context as any).framework7AppContext as IFramework7AppContext).getFramework7(f7 => {
                        if (self.vueComponent.onF7Init) {
                            self.vueComponent.onF7Init(f7);
                        }
                    });
                }
            });

            return innerEl;
        }
    });

    (reactClass as any).tag = args.tag;
    (reactClass as any).vueComponent = args.component;
    (reactClass as any).contextTypes = {
        framework7AppContext: React.PropTypes.object
    };

    return reactClass;
}