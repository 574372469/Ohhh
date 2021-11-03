import { ContentInterface, Next, Adapter, Adapters } from "./Ohhh.interface"

/** 参考koa洋葱模型
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

export function compose(middleware: Adapters) {
    // if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
    // for (const fn of middleware) {
    //     if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
    // }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */
    return function (args: any[], context: ContentInterface, next?: Next) {
        // last called middleware #
        let index = -1
        return dispatch(0)

        function dispatch(i) {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))

            index = i
            let fn = middleware[i]
            if (i === middleware.length) fn = next

            if (!fn) return Promise.resolve()

            try {
                return Promise.resolve(fn(args, context, dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}