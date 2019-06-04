---
title: Card
lang: en-US


---

# Card

<t-card class="mt-3">

  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias sit perspiciatis laboriosam doloribus, aliquam, porro quasi reiciendis.</p>

  </t-dropdown>
</t-card>

```html
<t-card>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias sit perspiciatis laboriosam doloribus, aliquam, porro quasi reiciendis.</p>
  </t-dropdown>
</t-card>
```

## Props

| Property | Type    | Default value | Accepted values   | Description                         |
| -------- | ------- | ------------- | ----------------- | ----------------------------------- |
| header   | String  | null          | Any string        | The header content                  |
| noBody   | Boolean | false         | Any boolean value | If `true` will remove the card body |

## Classes related props

| Property    | Description             |
| ----------- | ----------------------- |
| baseClass   | Base card wrapper class |
| bodyClass   | Card body class         |
| headerClass | Header class            |
| footerClass | Footer class            |

## Examples

#### Card with Header

<t-card header="Card with Header" class="mt-3">

  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ab vitae, facilis. Blanditiis fugiat ducimus, consectetur dolorum! Ea nisi, corporis laborum, numquam in, dolores maxime odio possimus similique voluptas officia?</p>

  </t-dropdown>
</t-card>

```html
<t-card header="Card with Header">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ab vitae, facilis. Blanditiis fugiat ducimus, consectetur dolorum! Ea nisi, corporis laborum, numquam in, dolores maxime odio possimus similique voluptas officia?</p>
  </t-dropdown>
</t-card>
```

#### Card with HTML Header

<t-card class="mt-3">

  <template v-slot:header>
    <h4 class="uppercase text-green-500">
      <svg
        class="stroke-current text-green-500 inline-block h-10 w-10"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle
          cx="8"
          cy="21"
          r="2"
        />
        <circle
          cx="20"
          cy="21"
          r="2"
        />
        <path d="M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1" />
      </svg>
      <span class="ml-3">HTML Header</span>
    </h4>
  </template>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ab vitae, facilis. Blanditiis fugiat ducimus, consectetur dolorum! Ea nisi, corporis laborum, numquam in, dolores maxime odio possimus similique voluptas officia?</p>

</t-card>

```html
<t-card>
  <template v-slot:header>
    <h4 class="uppercase text-green-500">
      <svg
        class="stroke-current text-green-500 inline-block h-10 w-10"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle
          cx="8"
          cy="21"
          r="2"
        />
        <circle
          cx="20"
          cy="21"
          r="2"
        />
        <path d="M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1" />
      </svg>
      <span class="ml-3">HTML Header</span>
    </h4>
  </template>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ab vitae, facilis. Blanditiis fugiat ducimus, consectetur dolorum! Ea nisi, corporis laborum, numquam in, dolores maxime odio possimus similique voluptas officia?</p>
</t-card>
```

#### Card with a footer

<t-card header="Card with a footer" class="mt-3">

  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ab vitae, facilis. Blanditiis fugiat ducimus, consectetur dolorum! Ea nisi, corporis laborum, numquam in, dolores maxime odio possimus similique voluptas officia?</p>
  <template v-slot:footer>
    <div class="flex justify-between">
      <t-button size="sm" variant="tertiary">Cancel</t-button>
      <t-button size="sm" variant="primary">Download</t-button>
    </div>
  </template>

  </t-dropdown>
</t-card>

```html
<t-card header="Card with a footer">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ab vitae, facilis. Blanditiis fugiat ducimus, consectetur dolorum! Ea nisi, corporis laborum, numquam in, dolores maxime odio possimus similique voluptas officia?</p>
  <template v-slot:footer>
    <div class="flex justify-between">
      <t-button size="sm" variant="tertiary">Cancel</t-button>
      <t-button size="sm" variant="primary">Download</t-button>
    </div>
  </template>
  </t-dropdown>
</t-card>
```

#### Card witouth body

<t-card no-body class="mt-3">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla optio, veritatis architecto debitis ab culpa dolores deleniti, vel aut eos repellendus libero, laborum perspiciatis, quibusdam doloremque aliquam amet sit eaque!</p>
</t-card>

```html
<t-card no-body>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla optio, veritatis architecto debitis ab culpa dolores deleniti, vel aut eos repellendus libero, laborum perspiciatis, quibusdam doloremque aliquam amet sit eaque!</p>
</t-card>
```

