import data from "./data";

import snapshot from "./snapshot";

const commands = {
    set: {
        method: (key, value) => {
            return data.set(key, value);
        },
        checkSyntax: cmd => {
            let regex = /^(set)(\s[a-zA-Z0-9]+){2}$/g;

            return regex.test(cmd);
        },
        getParams: p => {
            return p.split(" ");
        }
    },
    get: {
        method: key => {
            return data.get(key);
        },
        checkSyntax: cmd => {
            let regex = /^(get)(\s[a-zA-Z0-9]+){1}$/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return p.split(" ");
        }
    },
    llen: {
        method: key => {
            return data.llen(key);
        },
        checkSyntax: cmd => {
            let regex = /^(llen)(\s[a-zA-Z0-9]+){1}$/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return p.split(" ");
        }
    },
    rpush: {
        method: (key, values) => {
            return data.rpush(key, values);
        },
        checkSyntax: cmd => {
            let regex = /^(rpush)(\s[a-zA-Z0-9]+)+/g;
            return regex.test(cmd);
        },
        getParams: p => {
            p = p.split(" ");

            return [p.shift(), p];
        }
    },
    lpop: {
        method: key => {
            return data.lpop(key);
        },
        checkSyntax: cmd => {
            let regex = /^(lpop)(\s[a-zA-Z0-9]+){1}/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return p.split(" ");
        }
    },
    rpop: {
        method: key => {
            return data.rpop(key);
        },
        checkSyntax: cmd => {
            let regex = /^(rpop)(\s[a-zA-Z0-9]+){1}/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return p.split(" ");
        }
    },
    lrange: {
        method: (key, values) => {
            return data.lrange(key, values);
        },
        checkSyntax: cmd => {
            let regex = /^(lrange)(\s[a-zA-Z0-9]+){3}/g;
            return regex.test(cmd);
        },
        getParams: p => {
            p = p.split(" ");

            return [p.shift(), p];
        }
    },
    sadd: {
        method: (key, values) => {
            return data.sadd(key, values);
        },
        checkSyntax: cmd => {
            let regex = /^(sadd)(\s[a-zA-Z0-9]+)+/g;
            return regex.test(cmd);
        },
        getParams: p => {
            p = p.split(" ");

            return [p.shift(), p];
        }
    },
    scard: {
        method: (key, values) => {
            return data.scard(key, values);
        },
        checkSyntax: cmd => {
            let regex = /^(scard)(\s[a-zA-Z0-9]+){1}/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return p.split(" ");
        }
    },
    smembers: {
        method: (key, values) => {
            return data.smembers(key, values);
        },
        checkSyntax: cmd => {
            let regex = /^(smembers)(\s[a-zA-Z0-9]+){1}/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return p.split(" ");
        }
    },
    srem: {
        method: (key, values) => {
            return data.srem(key, values);
        },
        checkSyntax: cmd => {
            let regex = /^(srem)(\s[a-zA-Z0-9]+)+/g;
            return regex.test(cmd);
        },
        getParams: p => {
            p = p.split(" ");
            return [p.shift(), p];
        }
    },
    sinter: {
        method: values => {
            return data.sinter(values);
        },
        checkSyntax: cmd => {
            let regex = /^(sinter)(\s[a-zA-Z0-9]+)+/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return [p.split(" ")];
        }
    },
    keys: {
        method: () => {
            return data.keys();
        },
        checkSyntax: cmd => {
            let regex = /^(keys)/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return [];
        }
    },
    del: {
        method: keys => {
            return data.del(keys);
        },
        checkSyntax: cmd => {
            let regex = /^(del)(\s[a-zA-Z0-9]+)+/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return [p.split(" ")];
        }
    },
    flushdb: {
        method: () => {
            return data.flushdb();
        },
        checkSyntax: cmd => {
            let regex = /^(flushdb)/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return [p.split(" ")];
        }
    },
    expire: {
        method: (key, seconds) => {
            return data.expire(key, seconds);
        },
        checkSyntax: cmd => {
            let regex = /^(expire)(\s[a-zA-Z0-9]+){2}/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return p.split(" ");
        }
    },
    ttl: {
        method: key => {
            return data.ttl(key);
        },
        checkSyntax: cmd => {
            let regex = /^(ttl)(\s[a-zA-Z0-9]+){1}/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return p.split(" ");
        }
    },
    save: {
        method: data => {
            return snapshot.save(data);
        },
        checkSyntax: cmd => {
            let regex = /^(save)$/g;
            return regex.test(cmd);
        }
    },
    restore: {
        method: () => {
            return snapshot.restore();
        },
        checkSyntax: cmd => {
            let regex = /^(restore)$/g;
            return regex.test(cmd);
        },
        getParams: p => {
            return p.split(" ");
        }
    }
};

export const parseSyntax = syntax => {
    if (/\s/.test(syntax)) {
        syntax = syntax.trim().toLowerCase();

        return {
            syntax: syntax,
            command: syntax.substr(0, syntax.indexOf(" ")),
            args: syntax.substr(syntax.indexOf(" ") + 1)
        };
    } else {
        return { syntax: syntax, command: syntax, args: "" };
    }
};

export default commands;