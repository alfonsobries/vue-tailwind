/* eslint-disable max-len */
<template>
  <t-card
    id="app"
    :variant="variant === 'error' ? variant : undefined"
  >
    <t-dialog
      name="named-dialog"
      :icon="icon"
      title="Remove user?"
    >
      <template slot="title">
        yeah yeah
      </template>

      <template slot="icon">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        /></svg>
      </template>

      <template
        slot="buttons"
        slot-scope="{ ok, cancel }"
      >
        <a
          href="#"
          @click.prevent="ok"
        >Ok do it</a>
        <a
          href="#"
          @click.prevent="cancel"
        >Cancel</a>
      </template>

      This is the content of the dialog.
    </t-dialog>

    <t-select
      v-model="icon"
      :options="iconOptions"
    />

    <t-button
      @click.prevent="openDialogProgramatically"
    >
      Alert by dialog name
    </t-button>

    <t-button @click.prevent="$alert('Remove user?', 'Are you sure you want to remove this user? This action cannot be undone', 'warning')">
      Alert directly
    </t-button>

    <t-datepicker
      v-model="date"
      multiple
      inline
    />

    {{ date }}

    <ul>
      <t-toggle
        name="variant"
        value="PM"
        unchecked-value="AM"
        checked-placeholder="AM"
        unchecked-placeholder="PM"
        checked-label="PM"
        unchecked-label="AM"
        :classes="{
          wrapper: 'bg-gray-200 focus:outline-none focus:shadow-outline rounded-sm border-2',
          wrapperChecked: 'bg-gray-200 focus:outline-none focus:shadow-outline rounded-sm border-2',
          button: 'rounded-sm w-6 h-6 bg-white shadow flex items-center justify-center text-gray-800 text-xs',
          buttonChecked: 'rounded-sm w-6 h-6 bg-white shadow flex items-center justify-center text-gray-800 text-xs',
          checkedPlaceholder: 'rounded-sm w-6 h-6 flex items-center justify-center text-gray-500 text-xs',
          uncheckedPlaceholder: 'rounded-sm w-6 h-6 flex items-center justify-center text-gray-500 text-xs'
        }"
      />

      <t-toggle
        v-model="multipleVariants"
        checked
      />
      <t-toggle
        checked
        name="checked"
      />

      <br>

      <t-dropdown>
        <template
          slot="trigger"
          slot-scope="{ mousedownHandler, focusHandler, blurHandler, keydownHandler, disabled }"
        >
          <t-button
            :disabled="disabled"
            @mousedown="mousedownHandler"
            @focus="focusHandler"
            @blur="blurHandler"
            @keydown="keydownHandler"
          >
            Dropdown
          </t-button>
        </template>

        <template
          slot-scope="{ blurHandler }"
          class="flex flex-col"
        >
          <li>
            <a
              class="block w-full p-3 hover:bg-gray-200"
              href=""
              @blur="blurHandler"
            >Option A</a>
          </li>
          <li>
            <a
              class="block w-full p-3 hover:bg-gray-200"
              href=""
              @blur="blurHandler"
            >Option B</a>
          </li>
          <li>
            <a
              class="block w-full p-3 hover:bg-gray-200"
              href=""
              @blur="blurHandler"
            >Option C</a>
          </li>
        </template>
      </t-dropdown>
    </ul>

    <t-input-group
      label="Select variant"
      description="Select a variant to apply to some of the components"
      feedback="Some feedback"
      :variant="variant === 'error' ? variant : undefined"
    >
      <t-select
        v-model="variant"
        :options="variants"
        :variant="variant"
      />
    </t-input-group>

    <t-input-group
      label="Select variant"
      description="Select a variant to apply to some of the components"
      feedback="Some feedback"
      :variant="variant === 'error' ? variant : undefined"
    >
      <t-rich-select
        v-model="variant"
        :options="variants"
        clearable
        placeholder="select an option"
      />
      <t-rich-select
        v-model="variant"
        :options="variants"
        clearable
        placeholder="select an option"
        hide-search-box
      />
      <t-rich-select
        :options="optGroupOptions"
        :max-height="200"
      />
    </t-input-group>

    <t-input-group
      label="Select with ajax resutls"
    >
      <t-rich-select
        :options="repositories"
        clearable
        placeholder="select an option"
        :fetch-options="getOptions"
        value-attribute="full_name"
        text-attribute="full_name"
        :minimum-input-length="3"
      >
        <template
          slot="dropdownDown"
          slot-scope="{ query }"
        >
          <div
            v-if="query"
            class="text-center"
          >
            <t-button
              type="button"
              class="block w-full text-sm"
              @click="addOption(query)"
            >
              Add {{ query }}
            </t-button>
          </div>
        </template>

        <template
          slot="label"
          slot-scope="{ className, option: { raw: repo } }"
        >
          <div
            v-if="typeof repo === 'string'"
            :class="className"
          >
            {{ repo }}
          </div>
          <div
            v-else
            class="flex items-center"
          >
            <span class="flex-shrink-0">
              <img
                class="w-10 h-10 rounded-full"
                :src="repo.owner.avatar_url"
              >
            </span>
            <div class="flex flex-col ml-2 text-gray-800">
              <strong>{{ repo.full_name }}</strong>
              <span class="text-sm leading-tight text-gray-700">{{ repo.description }}</span>
            </div>
          </div>
        </template>

        <template
          slot="option"
          slot-scope="{ className, option: { raw: repo } }"
        >
          <div
            v-if="typeof repo === 'string'"
            :class="className"
          >
            {{ repo }}
          </div>

          <div
            v-else
            class="flex p-2 border-b"
          >
            <span class="flex-shrink-0">
              <img
                class="w-10 h-10 rounded-full"
                :src="repo.owner.avatar_url"
              >
            </span>
            <div class="flex flex-col ml-2 text-gray-800">
              <strong>{{ repo.full_name }}</strong>
              <span class="text-sm leading-tight text-gray-700">{{ repo.description }}</span>
              <div class="flex justify-between mt-1 -mx-1 text-xs text-gray-700">
                <span class="px-1">{{ repo.forks_count }} Forks</span>
                <span class="px-1">{{ repo.stargazers_count }} Stars</span>
                <span class="px-1">{{ repo.watchers_count }} Watchers</span>
              </div>
            </div>
          </div>
        </template>
      </t-rich-select>
    </t-input-group>

    <t-input-group
      label="Select a post"
    >
      <t-rich-select
        clearable
        placeholder="Select a cause"
        :fetch-options="getCauses"
        text-attribute="name"
        :open-on-focus="false"
        :minimum-results-for-search="8"
      />
    </t-input-group>

    <t-input-group>
      <template v-slot:label>
        label from slot
      </template>
      <template v-slot:description>
        Description from slot
      </template>
      <template v-slot:feedback>
        Feedback from slot
      </template>
      <t-input
        v-model="model"
        :variant="variant"
      />
    </t-input-group>

    <t-input
      v-model="classes"
    />

    <t-input
      v-model="classes"
      :classes="classes"
    />

    <t-input
      v-model="classes"
      :classes="classes"
    />

    <t-radio-group
      id="radio-group"
      v-model="variant"
      name="radio-group"
      variant="wrapped"
      tabindex="0"
      :options="variants"
    />

    <label
      v-for="variantValue in variants"
      :key="variantValue"
      class="flex items-center"
      :for="`variant-${variantValue}`"
    >
      <t-radio
        :id="`variant-${variantValue}`"
        v-model="variant"
        :value="variantValue"
        name="variant"
      />

      <span class="ml-2 text-sm">
        {{ variantValue }}
      </span>
    </label>


    <div class="flex mx-2">
      <t-radio
        v-model="wrappedRadioValue"
        label="option 1"
        wrapped
        value="1"
        tabindex="0"
        name="wrapped"
        variant="wrapped"
      />

      <t-radio
        v-model="wrappedRadioValue"
        label="option 2"
        wrapped
        value="2"
        tabindex="0"
        name="wrapped"
        variant="wrapped"
      />
    </div>

    <t-textarea
      :variant="{
        'default': activeVariant,
        'error': !activeVariant,
      }"
      value="variants from object"
    />

    <t-checkbox
      v-model="activeVariant"
      name="activeVariant"
    />

    <label
      class="flex items-center"
      for="checked"
    >
      <t-checkbox
        v-model="checked"
        name="checked"
        value="Checked"
        unchecked-value="Unchecked"
        :indeterminate.sync="indeterminate"
      />

      <span class="ml-2 text-sm">
        {{ checked }}
      </span>
    </label>

    <label
      class="flex items-center"
      for="checked"
    >
      <t-checkbox
        v-model="indeterminate"
        name="indeterminate"
      />
      <span class="ml-2 text-sm">
        indeterminate: {{ indeterminate }}
      </span>
    </label>

    <t-select
      v-model="multipleVariants"
      :options="variants"
      multiple
    />

    <label
      v-for="variantValue in variants"
      :key="`check-${variantValue}`"
      class="flex items-center"
      for="variant"
    >

      <t-toggle
        v-model="multipleVariants"
        name="variant"
        :value="variantValue"
      >
        <template
          slot="default"
          slot-scope="{ isChecked }"
        >
          <span
            class="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity"
            :class="{
              'opacity-100 ease-in duration-200': !isChecked,
              'opacity-0 ease-out duration-100': isChecked,
            }"
          >
            <svg
              class="w-3 h-3 text-gray-400"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span
            class="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity "
            :class="{
              'opacity-100 ease-in duration-200': isChecked,
              'opacity-0 ease-out duration-100': !isChecked,
            }"
          >
            <svg
              class="w-3 h-3 text-blue-500"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        </template>
      </t-toggle>

      <span class="ml-2 text-sm">
        {{ variantValue }}
      </span>
    </label>

    <t-checkbox
      v-for="variantValue in variants"
      :key="`check2-${variantValue}`"
      v-model="multipleVariants"
      :value="variantValue"
      name="variant"
      :label="variantValue"
      wrapped
      tabindex="0"
      variant="wrapped"
    />

    <t-checkbox-group
      v-model="multipleVariants"
      :options="variants"
      name="variant-2"
      tabindex="0"
      variant="wrapped"
    />

    <t-button>Hello world</t-button>

    <t-select
      v-model="optgroupValue"
      :options="optGroupOptions"
    />


    <t-select
      :options="['A', 'No model selected', 'multiple']"
      :value="['No model selected', 'multiple']"
      multiple
    />

    <t-select
      :options="['A', 'No model selected', 'C']"
      value="No model selected"
    />

    <label
      class="flex items-center"
      for="checked"
    >
      <t-radio
        checked
      />

      <span class="ml-2 text-sm">
        no model selected
      </span>
    </label>

    <label
      class="flex items-center"
      for="checked"
    >
      <t-checkbox
        checked
      />

      <span class="ml-2 text-sm">
        no model checked
      </span>
    </label>


    <t-input
      value="no model value"
    />
    <t-textarea
      value="no model value"
    />

    <t-alert
      show
      dismissible
      :variant="variant"
    >
      Something goes wrong!
    </t-alert>

    <t-modal
      v-model="showModal"
      name="named-modal"
      :variant="variant"
    >
      <template v-slot:footer>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </template>
      <template v-slot:header>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </template>
      <p
        v-for="(i, index) in [1,2,3,4,5,6,7,8,9,0,0,2,35,6,8,8,978,96789,8,9,4,36,4]"
        :key="index"
      >
        Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet
        consectetur adipisicing elit.
      </p>
    </t-modal>
    <t-button @click.prevent="showModal = true">
      Open modal
    </t-button>
    <t-button @click.prevent="$modal.show('named-modal', { id: 1})">
      Open modal by name
    </t-button>

    <t-pagination
      :total-items="9999"
      :value="1"
    />

    <t-table
      variant="demo"
      :headers="['Name', 'Email', 'Age', 'Sales']"
      :data="[
        ['Alfonso Bribiesca', 'alfonso@vexilo.com', '31', '$9,999.00'],
        ['Saida Redondo', 'saida@gmail.com', 27, '$124.00'],
        ['Regina Bribiesca', 'regina@gmail.com', 1, '$0.00']
      ]"
    />

    <t-table
      :headers="['Name', 'E-mail', 'Status', '']"
      :data="[
        {
          id: 1,
          name: 'Alfonso Bribiesca',
          email: 'alfonso@vexilo.com',
          is_approved: true,
        },
        {
          id: 2,
          name: 'Saida Redondo',
          email: 'saida@gmail.com',
          is_approved: false,
        },
      ]"
      :responsive="true"
      :responsive-breakpoint="1024"
    >
      <template
        slot="tbody"
        slot-scope="{ tbodyClass, trClass, tdClass, thClass, renderResponsive, data }"
      >
        <template v-if="renderResponsive">
          <tbody
            v-for="(row, rowIndex) in data"
            :key="rowIndex"
            :class="[tbodyClass, rowIndex % 2 === 0 ? 'bg-gray-100' : '']"
          >
            <tr :class="trClass">
              <th :class="thClass">
                Name
              </th>
              <td :class="[tdClass, 'relative']">
                <t-dropdown
                  :visible-arrow="false"
                  placement="left-start"
                  variant="tertiary"
                  class="absolute top-0 right-0"
                >
                  <template slot="button-content">
                    <svg
                      version="1.1"
                      viewBox="0 0 16 16"
                      class="text-gray-600 fill-current svg-icon svg-fill"
                      heigth="20"
                      style="width: 20px;"
                    ><path
                      pid="0"
                      d="M13 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 13 7zM8 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 8 7zM3 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 3 7z"
                    /></svg>
                  </template>
                  <button
                    class="block w-full px-4 py-2 text-left text-gray-800 hover:text-white hover:bg-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    class="block w-full px-4 py-2 text-left text-gray-800 hover:text-white hover:bg-blue-500"
                  >
                    Delete
                  </button>
                </t-dropdown>
                {{ row.name }}
              </td>
            </tr>
            <tr :class="trClass">
              <th :class="thClass">
                Email
              </th>
              <td :class="[tdClass, 'td-overflow']">
                <a
                  :href="`mailto: ${row.email}`"
                  class="text-gray-600 hover:underline"
                >{{ row.email }}</a>
              </td>
            </tr>
            <tr :class="trClass">
              <th :class="thClass">
                Status
              </th>
              <td :class="[tdClass]">
                <span
                  v-if="row.is_approved"
                  class="px-5 py-1 text-sm font-bold text-green-900 bg-green-200 rounded-full d-flex"
                >
                  Active
                </span>
                <span
                  v-else
                  class="px-5 py-1 text-sm font-bold text-gray-900 bg-gray-200 rounded-full d-flex"
                >
                  Inactive
                </span>
              </td>
            </tr>
          </tbody>
        </template>
      </template>
      <template
        slot="row"
        slot-scope="{ trClass, tdClass, rowIndex, row }"
      >
        <tr :class="[trClass, rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
          <td :class="[tdClass, 'w-full']">
            {{ row.name }}
          </td>
          <td :class="tdClass">
            <a
              :href="`mailto: ${row.email}`"
              class="text-gray-600 hover:underline"
            >{{ row.email }}</a>
          </td>
          <td :class="[tdClass, 'text-center']">
            <span
              v-if="row.is_approved"
              class="px-5 py-2 text-sm font-bold text-green-900 bg-green-200 rounded-full d-flex"
            >
              Active
            </span>
            <span
              v-else
              class="px-5 py-2 text-sm font-bold text-gray-900 bg-gray-200 rounded-full d-flex"
            >
              Inactive
            </span>
          </td>
          <td :class="[tdClass, 'text-right']">
            <t-dropdown
              :visible-arrow="false"
              placement="bottom-end"
              variant="tertiary"
            >
              <template slot="button-content">
                <svg
                  version="1.1"
                  viewBox="0 0 16 16"
                  class="text-gray-600 fill-current svg-icon svg-fill"
                  heigth="20"
                  style="width: 20px;"
                ><path
                  pid="0"
                  d="M13 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 13 7zM8 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 8 7zM3 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 3 7z"
                /></svg>
              </template>
              <button
                class="block w-full px-4 py-2 text-left text-gray-800 hover:text-white hover:bg-blue-500"
              >
                Edit
              </button>
              <button
                :to="{ name: 'settings.profile' }"
                class="block w-full px-4 py-2 text-left text-gray-800 hover:text-white hover:bg-blue-500"
              >
                Delete
              </button>
            </t-dropdown>
          </td>
        </tr>
      </template>
      <template
        slot="tfoot"
        slot-scope="{ tfootClass, trClass, tdClass, renderResponsive }"
      >
        <tfoot :class="tfootClass">
          <tr :class="trClass">
            <td
              :class="tdClass"
              :colspan="renderResponsive ? 2 : 4"
            >
              <t-pagination
                :hide-prev-next-controls="renderResponsive"
                :total-items="100"
                :per-page="renderResponsive ? 3 : 5"
                :class="{'ml-auto': !renderResponsive, 'mx-auto': renderResponsive}"
              />
            </td>
          </tr>
        </tfoot>
      </template>
    </t-table>
  </t-card>
</template>

<script lang="ts">
import '../css/tailwind.css';

/* eslint-disable max-len */

import Vue from 'vue';
import VueTailwind from './index';

// import TInput from './t-input';
// import TTextarea from './t-textarea';
// import TSelect from './t-select';
// import TRadio from './t-radio';

// Vue.use((TInput as any), {
//   classes: 'border block rounded bg-white p-3',
//   variants: {
//     default: 'border block rounded bg-white p-3',
//     error: 'border block rounded bg-red-500 text-white p-3',
//     asarray: ['border', 'block', 'rounded', 'bg-blue-500', 'text-white', 'p-3'],
//     asobject: {
//       border: true,
//       block: 'yes',
//       'rounded bg-yellow-300 text-red-500 p-3': 'yes',
//     },
//   },
// });

Vue.use(VueTailwind, {
  TModal: {
    classes: {
      overlay: 'z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black bg-opacity-50',
      wrapper: 'z-50 relative mx-auto my-0 max-w-lg',
      modal: 'bg-white shadow rounded border overflow-hidden relative',
      body: 'p-4',
      header: 'p-4 border-b',
      footer: 'p-4 border-t',
      close: 'absolute right-0-top-0 whitespace-no-wrap font-medium text-blue-700 hover:text-blue-600',
      closeIcon: 'h-5 w-5 fill-current',
      overlayEnterClass: '',
      overlayEnterActiveClass: 'opacity-0 transition ease-out duration-100',
      overlayEnterToClass: 'opacity-100',
      overlayLeaveClass: 'transition ease-in opacity-100',
      overlayLeaveActiveClass: '',
      overlayLeaveToClass: 'opacity-0 duration-75',
      enterClass: '',
      enterActiveClass: '',
      enterToClass: '',
      leaveClass: '',
      leaveActiveClass: '',
      leaveToClass: '',
    },
    variants: {
      error: {
        overlay: 'z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black bg-opacity-50',
        wrapper: 'z-50 relative mx-auto my-0 max-w-lg p-5',
        modal: 'bg-red-100 shadow rounded border overflow-hidden relative',
        body: 'p-4',
        header: 'p-4 border-b border-red-200',
        footer: 'p-4 border-t border-red-200 bg-red-200',
        close: 'whitespace-no-wrap font-medium text-red-700 hover:text-red-600 absolute right-0 top-0 m-2',
        closeIcon: 'h-5 w-5 fill-current',
      },
    },
  },
  TCard: {
    classes: {
      wrapper: 'rounded border max-w-lg mx-auto',
      body: 'p-4',
      header: 'p-4 border-b',
      footer: 'p-4 border-t',
    },
    variants: {
      error: {
        wrapper: 'rounded border max-w-lg mx-auto border-red-500 bg-red-100',
        body: 'p-4',
        header: 'p-4 border-b border-red-500',
        footer: 'p-4 border-t border-red-500',
      },
    },
  },
  TAlert: {
    classes: {
      wrapper: 'rounded bg-blue-100 p-4 flex',
      body: 'flex-grow',
      close: 'whitespace-no-wrap font-medium text-blue-700 hover:text-blue-600',
      closeIcon: 'h-5 w-5 fill-current',
    },
    variants: {
      default: {
        wrapper: 'rounded bg-blue-100 p-4 flex',
        body: 'flex-grow',
        close: 'whitespace-no-wrap font-medium text-blue-700 hover:text-blue-600',
        closeIcon: 'h-5 w-5 fill-current',
      },
      error: {
        wrapper: 'rounded bg-red-100 p-4 flex',
        close: 'whitespace-no-wrap font-medium text-red-700 hover:text-red-600',
      },
    },
  },
  TInputGroup: {
    classes: {
      label: 'block uppercase tracking-wide text-xs font-bold mb-1',
      feedback: 'text-sm',
      description: 'text-sm',
      wrapper: 'mb-3',
      body: 'p-1',
    },
    variants: {
      error: {
        label: 'block uppercase tracking-wide text-xs font-bold mb-1 text-red-500',
        feedback: 'text-sm text-red-500',
        description: 'text-sm',
        wrapper: 'mb-3',
      },

    },
  },
  TTable: {
    classes: {
      table: 'w-full rounded-lg overflow-hidden table border-blue-700 border',
      thead: '',
      theadTr: 'border-blue-700',
      theadTh: 'uppercase font-bold p-2 bg-blue-500 text-blue-900 text-sm text-shadow',
      tbody: '',
      tr: 'border-t-0',
      td: 'p-2 text-sm text-center bg-blue-400 text-blue-900',
    },
    variants: {
      demo: {
        thead: '',
        theadTr: '',
        theadTh: '',
        tr: '',
        table: 'min-w-full divide-y divide-gray-200',
        tbody: 'bg-white divide-y divide-gray-200',
        td: 'px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500',
        th: 'px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider',
      },
    },
  },
  TButton: {
    classes: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
  },
  TSelect: {
    classes: 'form-select',
    // classes: {
    //   wrapper: 'relative',
    //   input: 'block appearance-none w-full border bg-white rounded p-3 border-2',
    //   arrow: 'fill-current h-4 w-4',
    //   arrowWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-1',
    // },
    // variants: {
    //   default: {
    //     wrapper: 'relative',
    //     input: 'block appearance-none w-full border pr-8 rounded leading-tight bg-white p-3',
    //     arrowWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2',
    //     arrow: 'fill-current h-4 w-4',
    //   },
    //   error: {
    //     wrapper: 'relative text-white',
    //     input: 'block appearance-none w-full border pr-8 rounded leading-tight bg-red-500 p-3',
    //     arrowWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2',
    //     arrow: 'fill-current h-4 w-4',
    //   },
    // },
  },
  TInput: {
    classes: 'border block rounded bg-white p-3',
    variants: {
      default: 'border block rounded bg-white p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
      asarray: ['border', 'block', 'rounded', 'bg-blue-500', 'text-white', 'p-3'],
      asobject: {
        border: true,
        block: 'yes',
        'rounded bg-yellow-300 text-red-500 p-3': 'yes',
      },
    },
  },
  TTextarea: {
    classes: 'form-textarea',
    variants: {
      default: 'border block rounded bg-blue-100 p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
    },
  },
  TRadio: {
    classes: 'form-radio text-indigo-600',
    variants: {
      default: 'border block rounded bg-white p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
      wrapped: {
        wrapper: 'p-2 bg-blue-500 rounded cursor-pointer shadow flex',
        wrapperChecked: 'p-2 bg-blue-600 rounded cursor-pointer shadow-inner flex',
        inputWrapper: 'border-2 border-blue-300 rounded-full bg-blue-200 w-4 h-4 block  mr-2',
        inputWrapperChecked: 'border-2 border-blue-700 rounded-full bg-blue-600 w-4 h-4 block mr-2',
        label: 'text-white text-sm',
        labelChecked: 'text-white text-sm underline',
        input: ' hidden ',
      },
    },
  },
  TRadioGroup: {
    variants: {
      wrapped: {
        wrapper: 'p-2 bg-blue-500 rounded cursor-pointer shadow flex',
        wrapperChecked: 'p-2 bg-blue-600 rounded cursor-pointer shadow-inner flex',
        inputWrapper: 'border-2 border-blue-300 rounded-full bg-blue-200 w-4 h-4 block  mr-2',
        inputWrapperChecked: 'border-2 border-blue-700 rounded-full bg-blue-600 w-4 h-4 block mr-2',
        label: 'text-white text-sm',
        labelChecked: 'text-white text-sm underline',
        input: ' hidden ',
      },
    },
  },
  TCheckboxGroup: {
    variants: {
      wrapped: {
        wrapper: 'p-2 bg-blue-500 rounded cursor-pointer shadow flex',
        wrapperChecked: 'p-2 bg-blue-600 rounded cursor-pointer shadow-inner flex',
        inputWrapper: 'hidden',
        inputWrapperChecked: 'hidden',
        label: 'text-white text-sm',
        labelChecked: 'text-white text-sm underline',
        input: ' hidden ',
      },
    },
  },
  TCheckbox: {
    classes: 'form-checkbox text-green-500',
    variants: {
      default: 'border block rounded bg-white p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
      wrapped: {
        wrapper: 'p-2 bg-blue-500 rounded cursor-pointer shadow flex',
        wrapperChecked: 'p-2 bg-blue-600 rounded cursor-pointer shadow-inner flex',
        inputWrapper: 'hidden',
        inputWrapperChecked: 'hidden',
        label: 'text-white text-sm',
        labelChecked: 'text-white text-sm underline',
        input: ' hidden ',
      },
    },
  },
});

export default Vue.extend({
  components: {
    // TInput,
    // TSelect,
    // TTextarea,
    // TRadio,
  },
  data() {
    return {
      date: ['1987-03-18'],
      wrappedRadioValue: '2',
      wrappedCheckboxValue: ['2'],
      repositories: [] as string[],
      repository: null as null | string,
      showModal: false,
      classes: 'border-2 bg-yellow-100 p-2 shadow rounded',
      indeterminate: false,
      checked: 'Checked',
      model: '',
      multipleVariants: ['error', 'asarray'],
      variant: 'error',
      variants: ['default', 'error', 'notdefined', 'asarray', 'asobject'],
      activeVariant: false,
      optgroupValue: 'With optgroup',
      optGroupOptions: [
        { value: 'optgroup', text: 'With optgroup' },
        { value: 'option-2', text: 'Option 2' },
        {
          text: 'Numbers',
          children: [
            { value: 1, text: 1 },
            { value: 2, text: 2 },
          ],
        },
        {
          text: 'Letters',
          children: [
            { value: 'A', text: 'A' },
            { value: 'B', text: 'B' },
            { value: 'C', text: 'C' },
          ],
        },
      ],
      icon: 'question',
      iconOptions: {
        warning: 'Warning',
        success: 'Success',
        error: 'Error',
        info: 'Info',
        question: 'Question',
      },
    };
  },
  methods: {
    openDialogProgramatically() {
      this.$dialog.show('named-dialog')
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
    addOption(repository: string): void {
      this.repositories.push(repository);
      this.repository = repository;
    },
    getCauses(q = '', nextPage?: number) {
      return fetch(`https://api.dona.me/causes?per_page=10&search=${q}&page=${nextPage || ''}`)
        .then((response) => response.json())
        .then((data) => ({ results: data.data, hasMorePages: !!data.next_page_url }));
    },
    getOptions(q = 'tailwind') {
      return fetch(`https://api.github.com/search/repositories?q=${q}&type=public`)
        .then((response) => response.json())
        .then((data) => ({ results: data.items }))
        .catch((error) => {
          console.log(error.json());
        });
    },
  },
});
</script>
