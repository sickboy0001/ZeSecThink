export interface TypeStartType  {
    id            :number
    disp_name     :string
    title_name    :string
    name          :string
    display_order :number  
}

export interface TypeStartPost{
        id         :number
        user_id    :number
        title      :string
        content    :string
        public_flg :boolean
        delete_flg :boolean
        type_id    :number
        create_at  :Date
        update_at  :Date
}