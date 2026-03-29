interface IMapper {
    filename: string
    public_id: string
    originalname: string
    url: string
}

const mapUploadFile = (files: Express.Multer.File[]): IMapper[] => {

    return (files.map((file) => (
        {
            filename: file.filename,
            public_id: file.filename,
            originalname: file.originalname,
            url: file.path

        }
    )))
}

export default mapUploadFile