Replace rev'd asset references in your production JS compiled with Webpack!

## Example
**Source File**
```js
var assetPath = "path/to/asset.jpg"
```

**rev-manifest.json**
```json
{
  "path/to/asset.jpg": "path/to/asset-78950a808a.jpg"
}
```

**Output**
```js
var assetPath = "path/to/asset-78950a808a.jpg"
```

## Configuration
You can either pass a `manifest` object directly, or pass a `manfiestPath` for the loader to try. The latter will not error if no manifest file is found. Filenames will simply remain the same.
The `manifestPath` parameter also supports `glob` queries.

There is optional `prefix` parameter - if given, it will be prepended to all queries to be replaced.

```js
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'rev-replace',
                query: {
                    manifest: require('path/to/manifest'),
                    manifestPath: 'path/to/manifest',
                    prefix: '/'
                }
            }
        ]
    }
}
```
