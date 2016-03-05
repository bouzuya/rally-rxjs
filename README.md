# rally-rxjs

An unofficial client for [RALLY](https://rallyapp.jp).

This is a [bouzuya/b-o-a][] example.
This is a [bouzuya/vdom-rxjs-ssr][] fork.

## Usage

```
$ npm run build
$ npm start
$ open http://localhost:3000/
```

## Note

```
      O<A> |
   +------>|-------+
   |       |       |
   |       |       |
FW |       |       | AP
   |       |       |
   |       |       |
   +-------|<------+
           | O<A>

O : Observable
A : Action
AP : Application
FW : Framework
```

### rally-rxjs

#### 0.2.0

- AP: 0.1.0
- FW: 0.2.0

#### 0.1.0

- AP: 0.1.0
- FW: 0.1.0

### AP

#### 0.1.0

- sign in
- stamp rally create
- stamp rally index
- stamp rally show
- spot create
- spot index

### FW

#### 0.2.0

- `type app = (action$ O<A>) => O<A>;`

#### 0.1.0

- [bouzuya/vdom-rxjs-ssr][]

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([http://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
[bouzuya/vdom-rxjs-ssr]: https://github.com/bouzuya/vdom-rxjs-ssr
[bouzuya/b-o-a]: https://github.com/bouzuya/b-o-a
