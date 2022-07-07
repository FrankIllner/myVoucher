<template>
    <form enctype="multipart/form-data">
        <div v-if="message">
            <div class="message-body">{{message}}</div>
        </div>
        <div class="field">
            <label> Mehrere Bilder Uploaden </label>
            <input
                multiple
                type="file"
                ref="files"
                @change="selectFile"
                class="file-input"
            />
        </div>

        <div class="field">
            <div v-for="(file, index) in files" :key="index" 
                :class="`level ${file.invalidMessage && 'has-text-danger'}`"
            >
                <div class="level-left">
                    <div class="level-item">
                        {{file.name}}
                        <span v-if="file.invalidMessage">&nbsp;- {{file.invalidMessage}}</span>
                    </div>

                </div>
                <div class="level right">
                    <div class="level-item">
                        <a @click.prevent="files.splice(index, 1);uploadFiles.splice(index, 1)" class="delete">X</a>
                    </div>

                </div>
            </div>

        </div>

    </form>
</template>

<script>
import axios from "axios"
import _ from "lodash"
export default {
    name: "MultipleUploads",

    data() {
        return {
            files: [],
            uploadFiles: [],
            valdiateUploadFiles: [],
            message: "",
            error: false
        }
    },
    methods: {

        selectFile(){
            const files = this.$refs.files.files;
     
            if (files === "") return;
            this.uploadFiles = [...this.uploadFiles, ...files];

            this.files = [
                ...this.files,
                ..._.map(files, file => ({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    invalidMessage: this.validate(file)
                }))

            ];
            return this.uploadFiles;

        },
        validate(file) {
            const allowedTypes = ["image/jpeg", "image/png"];
            const MAX_SIZE = 200000;

            if (file.size > MAX_SIZE) {
                return `Das Bild ist zu Groß - es sind max: ${MAX_SIZE/1000}Kb möglich`;
            }
            if (!allowedTypes.includes(file.type)) {
                return  "kein Bild!"
            }
            return "";
        },
        sendFile() {
            const formData = new FormData();
            _.forEach(this.uploadFiles, file => {
                if (this.validate(file) === "") {
                    formData.append('files[]', file);
                }
            });
            
            axios.post('/api', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(function (response) {
                  console.log('response');
                console.log(response);
                if (!response.data) {
                    console.log('Sorry File not uploaded.');
                } else {
                    console.log('Your Vuejs with PHP File uploaded successfully.');
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        },
        validateFiles() {
        _.forEach(this.uploadFiles, file => {
            
                if (this.validate(file) === "") {
                    this.valdiateUploadFiles.push(file.name);
                }
            });

            return this.valdiateUploadFiles;
        },
    },

    created() {
        this.$root.$refs.MultipleUploads = this;
    
    }
}
</script>
