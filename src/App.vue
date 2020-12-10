/* eslint-disable max-len */
<template>
  <div class="pb-36">
    <t-card
      header="Form elements"
      class="max-w-md mx-auto my-10"
    >
      <div class="grid grid-cols-1 gap-6">
        <t-input-group
          label="TInput"
          feedback="Example feedback"
        >
          <t-input placeholder="My placeholder" />
        </t-input-group>

        <t-input-group label="TTextarea">
          <t-textarea placeholder="My placeholder" />
        </t-input-group>
        <t-input-group label="TSelect">
          <t-select :options="options" />
        </t-input-group>
        <t-input-group label="TCheckbox">
          <label class="flex items-center">
            <t-checkbox checked />
            <span class="ml-2">Check me</span>
          </label>
        </t-input-group>
        <t-input-group label="TCheckbox">
          <label class="flex items-center">
            <t-radio
              name="radio"
              checked
            />

            <span class="ml-2">Select this</span>
          </label>
          <label class="flex items-center">
            <t-radio name="radio" />

            <span class="ml-2">Or select this</span>
          </label>
        </t-input-group>
        <t-input-group label="TButton">
          <t-button>My button</t-button>
        </t-input-group>
      </div>
    </t-card>
    <t-card
      header="Form components"
      class="max-w-md mx-auto my-10"
    >
      <div class="grid grid-cols-1 gap-6">
        <t-input-group label="TRichSelect">
          <t-rich-select
            clearable
            :options="options"
            placeholder="Select something"
          />
        </t-input-group>

        <t-input-group label="TDatepicker">
          <t-datepicker
            placeholder="Pick a date"
          />
        </t-input-group>

        <t-input-group label="TCheckboxGroup">
          <t-checkbox-group
            name="checkbox-group"
            :options="options"
          />
        </t-input-group>
        <t-input-group label="TRadioGroup">
          <t-radio-group
            name="radio-group"
            :options="options"
          />
        </t-input-group>
        <t-input-group label="TToggle">
          <t-toggle
            checked
            name="toggle"
          />
        </t-input-group>
      </div>
    </t-card>
    <t-card
      header="UI Elements"
      class="max-w-md mx-auto my-10"
    >
      <div class="grid grid-cols-1 gap-6">
        <t-input-group label="TModal">
          <t-modal
            name="modal"
            header="Modal title"
          >
            <div class="space-y-3">
              <p
                v-for="i in 3"
                :key="i"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, minus qui modi quam possimus sint mollitia voluptates ipsum eaque nemo expedita! Dolorum necessitatibus ad repellat maxime nihil ex doloremque doloribus?
              </p>
            </div>

            <template #footer>
              <div class="flex justify-end">
                <t-button @click.prevent="$modal.show('modal')">
                  Submit
                </t-button>
              </div>
            </template>
          </t-modal>
          <t-button @click.prevent="$modal.show('modal')">
            Open modal
          </t-button>
        </t-input-group>
        <t-input-group label="TDialog">
          <div class="flex space-x-3">
            <t-button
              @click.prevent="$dialog.confirm({
                title: 'Delete user?',
                icon: 'info',
                showCloseButton: true,
              })"
            >
              Open Dialog
            </t-button>
            <t-button
              @click.prevent="$dialog.prompt({
                title: 'Delete user?',
                text: 'This action cannot be undone.',
                icon: 'info',
                inputType: 'select',
                inputOptions: options,
                showCloseButton: true,
              })"
            >
              Open Prompt
            </t-button>
            <t-button
              @click.prevent="$dialog.alert({
                title: 'Delete user?',

              })"
            >
              Open alert
            </t-button>
          </div>
        </t-input-group>
        <t-input-group label="TAlert">
          <t-alert
            show
          >
            Something went wrong!
          </t-alert>
        </t-input-group>
        <t-input-group label="TTable">
          <t-table
            :headers="['Name', 'Email', 'Sales']"
            :data="[
              ['Alfonso Bribiesca', 'alfonso@vexilo.com', '$9,999.00'],
              ['Saida Redondo', 'saida@gmail.com', '$124.00'],
            ]"
          />
        </t-input-group>
        <t-input-group label="TPagination">
          <t-pagination
            :value="2"
            :total-items="100"
            :per-page="10"
          />
        </t-input-group>
        <t-input-group label="TDropdown">
          <t-dropdown text="Dropdown example">
            <div class="py-1 rounded-md shadow-xs">
              <a
                href="#"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                role="menuitem"
                @click.prevent
              >
                Your Profile
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                role="menuitem"
                @click.prevent
              >
                Settings
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                role="menuitem"
                @click.prevent
              >
                Sign out
              </a>
            </div>
          </t-dropdown>
        </t-input-group>
      </div>
    </t-card>
  </div>
</template>

<script lang="ts">
import '../css/tailwind.css';

import Vue from 'vue';
import VueTailwind from './index';

import TInput from './t-input';
import TTextarea from './t-textarea';
import TButton from './t-button';
import TSelect from './t-select';
import TCheckbox from './t-checkbox';
import TRadio from './t-radio';

import TRichSelect from './t-rich-select';
import TDatepicker from './t-datepicker';
import TCheckboxGroup from './t-checkbox-group';
import TRadioGroup from './t-radio-group';
import TInputGroup from './t-input-group';
import TToggle from './t-toggle';

import TModal from './t-modal';
import TAlert from './t-alert';
import TTable from './t-table';
import TDialog from './t-dialog';
import TPagination from './t-pagination';
import TCard from './t-card';
import TDropdown from './t-dropdown';

Vue.use(VueTailwind, {
  't-input': TInput,
  't-textarea': TTextarea,
  't-button': TButton,
  't-select': TSelect,
  't-checkbox': TCheckbox,
  't-radio': TRadio,
  't-rich-select': TRichSelect,
  't-datepicker': TDatepicker,
  't-checkbox-group': TCheckboxGroup,
  't-radio-group': TRadioGroup,
  't-input-group': TInputGroup,
  't-toggle': TToggle,
  't-modal': TModal,
  't-alert': TAlert,
  't-table': TTable,
  't-dialog': TDialog,
  't-pagination': TPagination,
  't-card': TCard,
  't-dropdown': TDropdown,
});

export default Vue.extend({
  data() {
    return {
      options: [
        'Option A',
        'Option B',
        'Option C',
      ],
    };
  },
});
</script>
