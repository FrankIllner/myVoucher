<template>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
        <div class="field">
            <label>Upload File </label>
            <input 
                type="file"
                ref="file"
                @change="selectFile"
            />
        </div>

    </form>
</template>

<script>
import axios from "axios"
export default {
    name: "Upload",

    data() {
        return {
            file: "",
        }
    },
    methods: {
        selectFile(){
            this.file = this.$refs.file.files[0];
        },
        async sendFile() {
    
            let formData = new FormData();
            formData.append('file', this.file);
            try {
                await axios.post( '/upload',formData)
             } catch(err) {
             
                console.log(err);
            }
        }
    },
    created() {
        this.$root.$refs.Upload = this;
    }
}
</script>
