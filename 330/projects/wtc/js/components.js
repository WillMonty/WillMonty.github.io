let inputFilter={
	props:['value', 'holder'],
	template:`<input class='filter' type="text" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :placeholder="holder">`
};

//Passes the selected value to <b-form-select>
let selectFilter={
	props:['value', 'options'],
	template:`<b-form-select class='filter' v-bind:value="value" v-on:change="$emit('change', value)" :options="options"/>`
};