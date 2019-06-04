<template>
  <div class="max-w-md mx-auto">
    <t-card>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias sit perspiciatis laboriosam doloribus, aliquam, porro quasi reiciendis.</p>
      </t-dropdown>
    </t-card>
    <t-card
      class="mt-3"
      header="Card with Header"
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ab vitae, facilis. Blanditiis fugiat ducimus, consectetur dolorum! Ea nisi, corporis laborum, numquam in, dolores maxime odio possimus similique voluptas officia?</p>
      </t-dropdown>
    </t-card>

    <t-card
      class="mt-3"
    >
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
      </t-dropdown>
    </t-card>

    <t-card
      class="mt-3"
      header="Card with a footer"
    >
      <template v-slot:footer>
        <div class="flex justify-between">
          <t-button size="sm" variant="tertiary">Cancel</t-button>
          <t-button size="sm" variant="primary">Download</t-button>
        </div>
      </template>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ab vitae, facilis. Blanditiis fugiat ducimus, consectetur dolorum! Ea nisi, corporis laborum, numquam in, dolores maxime odio possimus similique voluptas officia?</p>
      </t-dropdown>
    </t-card>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',

  data () {
    return {
      
    }
  },
}
</script>
