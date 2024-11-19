import { supabase } from '/src/supabaseClient'

export const getPosts = async (sortBy = 'created_at', ascending = false) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order(sortBy, { ascending: false })

  if (error) throw error
  return data
}

export const getPost = async (id) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const createPost = async (postData) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([postData])
  if (error) throw error
  return data
}

export const updatePost = async (id, postData) => {
  const { data, error } = await supabase
    .from('posts')
    .update(postData)
    .eq('id', id)
  if (error) throw error
  return data
}

export const deletePost = async (id) => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export const upvotePost = async (id) => {
  // First, call the RPC function to increment the upvotes
  const { error: rpcError } = await supabase
    .rpc('increment_upvotes', { row_id: id })

  if (rpcError) throw rpcError

  // Then, fetch the updated post
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}
export const getComments = async (postId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export const addComment = async (commentData) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([commentData])
  if (error) throw error
  return data
}

export const searchPosts = async (searchTerm) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .ilike('title', `%${searchTerm}%`)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}