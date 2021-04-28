# strapi-plugin-tunning

## Overview

This plugin was created with intention to implement simple strapi details, fixing some boring and repetitive problems to dealing in every project.

---

### **INPUT** - Feature

In many cases, you will need to test if input is comming up on request `body` or via `multipart/form-data`. To make this verification simple as one line of code, was implemented an util extension to get/set data field or file from request context. So you don't have to worry about how this is happening.

_Retrieving all input data_
```js
const data = strapi.tunning.input(ctx).data()
```
_Retrieving a field input data_
```js
const dataName = strapi.tunning.input(ctx).data("name")
```
_Retrieving a field input data with default value_
```js
const dataName = strapi.tunning.input(ctx).data("name", "unknown name")
```
_Listing all input files_
```js
const files = strapi.tunning.input(ctx).files()
```
_Retrieving one input file by field name_
```js
const fileThumb = strapi.tunning.input(ctx).files("thumb")
```
_Setting a field value to `body` or `multipart/form-data` programatically_
```js
strapi.tunning.input(ctx).set({ foo: "bar" })
```
---

### **KEEP** - Feature

A utils function to keep only necessary data from context request body:

You can use it direcly in your controllers or routes:

```js
strapi.tunning.keep(ctx, ["field_a", "field_b"])
```

Or you can pass it configured in your routes as a `keep` config option:
```json
{
  "routes": [
    {
      "method": "POST",
      "path": "/articles",
      "handler": "Article.create",
      "config": {
        "policies": [],
        "keep": ["slug", "title", "content"]
      }
    }
  ]
}
```

_It will remove any field from ctx.request.body that is not present on array, preventing user to pass unwanted data to fill unwanted fields._

---

### **VIRTUAL INPUT** Feature

Imagine, you have an implicit route that needs to update a specific value of your record, in some cases you could create a new controller just to implement this little specific business rule. But now you can pass this business rule to your route definition.

Example: You have an implicit route that frontends can call to `accept` a `profile`, so you need to filter only the specific field that needs to be updated (preventing to update an unwanted field), also need to force that this field value must to be true, once this implicit routes must to `accept` the profile. For this case you will need to create a custom controller to override the default controller allowing you to implement this business rule.

With the `virtual_input` feature you dont need be worried about that and you can implement this business rule direcly on route definition, avoiding you to override the default function or create another one to solve the problem. 

```json
{
  "routes": [
    {
      "method": "PUT",
      "path": "/profiles/:id/accept",
      "handler": "profile.update",
      "config": {
        "policies": [],
        "keep": [],
        "virtual_input": {
          "accepted": true
        }
      }
    }
  ]
}
```
_It will force only the input field `accepted` as true to be updated on default controller function_


---

### **PICK** Feature - Query Param

You can pass one more type of filter on your query params, the `_pick`, allowing you to select witch field you want to return from api, preventing data overfetching.

```bash
GET http://localhost:1337/articles?_pick=id,slug,title
```

Also you can pass it configured in your routes as a `pick` config option returning the selected fields mandatorily:
```json
{
  "routes": [
    {
      "method": "GET",
      "path": "/articles",
      "handler": "Article.find",
      "config": {
        "policies": [],
        "pick": ["id", "slug", "title"]
      }
    }
  ]
}
```


_It will returns only fields `id`, `slug` and `title` on response body_
