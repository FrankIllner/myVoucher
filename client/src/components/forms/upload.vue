<template>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
        <div v-if="message" >
            <div class="message-body">{{message}}</div>
        </div>
        <div class="field">
            <label>Ein Bild Upload File </label>
            <input 
                type="file"
                ref="file"
                @change="selectFile"
                class="file-input"
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
            message: "",
            error: false
        }
    },
    methods: {
        selectFile(){
            const file = this.$refs.file.files[0];
            if (file === "") return;
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            const MAX_SIZE = 200000;
            const tooLarge = file.size > MAX_SIZE;

            if (allowedTypes.includes(file.type) && !tooLarge) {
                this.file = file;
                this.error = false;
                this.message = "";
                return this.file;
            } else {
                this.error = true;
                this.message = tooLarge ? `das Bild ist zu Groß ${MAX_SIZE/1000}Kb` : "Nur Bilder erlaubt!"
            }
        },
        async sendFile() {
            const formData = new FormData();
            formData.append('file', this.file);
          
            try {
                await axios.post( '/upload',formData);
                this.message = "Bild wurde hochgeladen";
                this.file = "";
                this.error = false;
            } catch(err) {
                this.message = "Da ging was schief!";
                this.error = true;
            }
        }
    },
    created() {
        this.$root.$refs.Upload = this;
    }
}
</script>
