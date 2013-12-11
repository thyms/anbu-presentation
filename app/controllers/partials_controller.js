action('show', function(){
  layout('')
  render(req.params.partial);
});