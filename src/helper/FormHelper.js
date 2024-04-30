class FormHelper {
  validateFile(file) {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const maxFileSize = 4 * 1024 * 1024; // 4MB in bytes

    // Check file type
    const extension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      return false;
    }

    // Check file size
    if (file.size > maxFileSize) {
     return false;
    }

    return true;
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export const {
  getBase64,
  validateFile
} = new FormHelper();
